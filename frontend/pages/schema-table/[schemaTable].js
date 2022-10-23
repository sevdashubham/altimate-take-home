import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSchemaTableDataFetch} from "../../api/schemaTableApi";
import BreadCrumb from "../../components/BreadCrumb";

export default function SchemaTable() {
    const router = useRouter();
    const {schemaTable} = router.query;
    const [tableData, setTableData] = useState([]);
    const [metricsData, setMetricsData] = useState([]);
    const [searchedVal, setSearchedVal] = useState('');

    const handleSchemaTableSuccess = (res) => {
        console.log(res?.data);
        setTableData(res?.data?.schema);
        setMetricsData(res?.data?.metrics);
    }
    const handleError = (e) => {
        console.log("error", e);
    }

    const {schemaData, isFetching} = useSchemaTableDataFetch({
        onSuccess: handleSchemaTableSuccess,
        onError: handleError,
    });

    useEffect(() => {
        if (schemaTable) {
            schemaData({tableName: schemaTable});
        }
    }, [schemaTable]);

    const tableDataDisplay = () => {
        if (tableData.length === 0) {
            return <></>
        }
        return tableData
            .filter(
                (row) =>
                    !searchedVal.length ||
                    row.name
                        .toString()
                        .toLowerCase()
                        .includes(searchedVal.toString().toLowerCase())
            )
            .map((data, index) => {
                const {name, type, description} = data;
                return (
                    <tr className="bg-white border-b hover:bg-gray-50" key={name}>
                        <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                        >
                            {name}
                        </th>
                        <td className="py-4 px-6">{type}</td>
                        <td className="py-4 px-6">{description || "No description"}</td>
                    </tr>
                );
            });
    };

    const renderMetrics = () => {
        return metricsData
            .filter(
                (row) =>
                    !searchedVal.length ||
                    row.name
                        .toString()
                        .toLowerCase()
                        .includes(searchedVal.toString().toLowerCase())
            )
            .map((data, index) => {
                const {name, type, metric_count, distinct, average} = data;
                return (
                    <tr className="bg-white border-b hover:bg-gray-50" key={name}>
                        <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                        >
                            {name}
                        </th>
                        <td className="py-4 px-6">{type}</td>
                        <td className="py-4 px-6">{metric_count}</td>
                        <td className="py-4 px-6">{distinct}</td>
                        <td className="py-4 px-6">{Number.isInteger(average) ? average.toFixed(2): average}</td>
                    </tr>
                );
            });
    }

    return (
        <div>
            <BreadCrumb title={'Schema & Metrics'}/>
            <div className="overflow-x-auto relative border shadow-md sm:rounded-lg p-4 m-4">
                <div className="pb-4 bg-white ">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative mt-1">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <MagnifyingGlassIcon className="h-4 w-4"/>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 pl-10 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   "
                            placeholder="Find in table..."
                            onChange={(e) => setSearchedVal(e.target.value)}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 border shadow-md">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" className="py-3 px-6 w-1/6">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6 w-1/6">
                            Type
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Description
                        </th>
                    </tr>
                    </thead>
                    <tbody>{tableDataDisplay()}</tbody>
                </table>
                <div className="pt-6 pb-4 text-lg font-semibold text-gray-600">
                    Metrics
                </div>
                <table className="w-full text-sm text-left text-gray-500 border shadow-md">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" className="py-3 px-6 w-1/6">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6 w-1/6">
                            Type
                        </th>
                        <th scope="col" className="py-3 px-6 w-1/6">
                            Count
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Distinct
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Mean
                        </th>
                    </tr>
                    </thead>
                    <tbody>{renderMetrics()}</tbody>
                </table>
            </div>
        </div>
    );
}
