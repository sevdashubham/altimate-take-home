import {useEffect, useState} from "react";
import {ChevronRightIcon} from "@heroicons/react/24/solid";
import {useDBConnect} from "../api/dbConnectApi";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import BreadCrumb from "../components/BreadCrumb";

const formInputs = [{
    key: 'user',
    type: 'text',
    text: 'Username',
    desc: 'Username to connect to MySQL. This user should have privileges to\n' + 'read all the metadata in Mysql.'
},
    {key: 'password', type: 'password', text: 'Password', desc: 'Password to connect to Mysql.'},
    {key: 'host', type: 'text', text: 'Host And Port', desc: 'Host and port to the MySQL service.'},
    {
        key: 'database',
        type: 'text',
        text: 'DatabaseSchema',
        desc: 'databaseSchema of the data source. This is optional parameter, if\n' +
            'you would like to restrict the metadata reading to a single\n' +
            'databaseSchema. When left blank, OpenMetadata Ingestion attempts\n' +
            'to scan all the databaseSchema.'
    },
]

export default function Home() {
    const router = useRouter();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            setFormError('Fill all required fields');
        }
    }, [errors])

    const handleDBConnectSuccess = (e) => {
        e?.status === "Ok" && router.push("/list-table");
    }

    const handleError = (e) => {
        setFormError(e.code)
    }

    const {dbConnect, isFetching} = useDBConnect({
        onSuccess: handleDBConnectSuccess,
        onError: handleError,
    });

    const renderInputs = () => {
        return formInputs.map(formInput => {
            return (
                <div className="mb-4" key={formInput.key}>
                    <label
                        className="text-gray-500 text-base font-medium"
                        htmlFor="username"
                    >
                        {formInput.text}<span className="text-red-500">*</span>
                    </label>
                    <p className="text-gray-400 text-xs">
                        {formInput.desc}
                    </p>
                    <input
                        className="mt-2 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={formInput.key}
                        type={formInput.type}
                        name={formInput.key}
                        {...register(formInput.key, {required: true})}
                    />
                </div>
            )
        })
    }

    const onSubmit = data => {
        dbConnect(data);
    }

    return (
        <div>
            <BreadCrumb title={'Connect To Database'}/>
            <div className="overflow-x-auto relative border shadow-md sm:rounded-lg p-0 m-4">
                <div className="px-8 pt-6 m-4 text-lg font-semibold text-gray-600">
                    Connect To Database
                </div>
                {/* Form */}
                <form className="px-8 pt-2 pb-8 m-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <label className="text-gray-600 text-base">MysqlConnection</label>
                        <p className="text-gray-400 text-xs">
                            Mysql Database Connection Config
                        </p>
                    </div>

                    <div className="my-4">
                        <label className="text-gray-600 text-base">Connection Scheme</label>
                        <p className="text-gray-400 text-xs">
                            SQLAlchemy driver scheme options.
                        </p>
                        <div className="relative mt-2">
                            <select
                                name="db_type"
                                className="appearance-none w-full bg-white border-2 text-gray-600 text-base px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>postgres</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {renderInputs()}
                    {formError !== '' && <p className="text-red-400 text-xs">
                        {formError}
                    </p>}
                    <div className="flex items-center justify-end mt-8">
                        <button
                            type="submit"
                            className="bg-[#5d29e3] text-white ml-4 text-sm py-2 px-4 rounded-md cursor-pointer focus:outline-none focus:shadow-outline"
                        >
                            {isFetching ? 'Saving' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
