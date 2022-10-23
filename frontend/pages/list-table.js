import {ServerStackIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {useSchemaListFetch} from "../api/listTableApi";
import {useRouter} from "next/router";
import BreadCrumb from "../components/BreadCrumb";

const Vr = () => <div className="mx-3">|</div>;

export default function ListTable() {
    const router = useRouter();
    const [tableList, setTableList] = useState([]);
    const handleSchemaListSuccess = (res) => {
        setTableList(res.data);
    }
    const handleError = (e) => console.log("error", e);

    const {schemaList, isFetching} = useSchemaListFetch({
        onSuccess: handleSchemaListSuccess,
        onError: handleError,
    });

    useEffect(() => {
        schemaList();
    }, []);

    const renderTableList = () => {
        return (
            tableList &&
            tableList.map((data, index) => {
                const {name} = data;
                return (
                    <div className="m-2 border-2 p-3 rounded cursor-pointer" key={data.name} onClick={() => {
                        router.push(`/schema-table/${name}`);
                    }}>
                        <div className="text-xs text-gray-400 font-semibold">
                            default.awsdatatake-testing
                        </div>
                        <div
                            className="flex items-center"
                        >
                            <ServerStackIcon className="h-6 w-6 text-[#5d29e3]"/>
                            <div className="text-base text-gray-600 font-semibold ml-2">
                                {data.name}
                            </div>
                        </div>
                        <div className="capitalize text-xs text-gray-400 font-medium my-2 flex items-center">
                            no owner <Vr/> no tier <Vr/> usage - 0th pctile
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                            No description
                        </div>
                    </div>
                );
            })
        );
    };

    return (
        <div>
            <BreadCrumb title={'List of tables'}/>
            <div className="overflow-x-auto relative border shadow-md sm:rounded-lg p-4 m-4">
            {renderTableList()}
            </div>
        </div>
    );
}
