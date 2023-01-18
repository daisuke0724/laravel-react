import React from 'react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import PrimaryButton from "../../Components/PrimaryButton";
import {useForm} from "@inertiajs/inertia-react";
import InputError from "../../Components/InputError";

interface Props {
    auth: any;
}

export default function Index({auth}: Props) {

    const {data, setData, post, processing, reset, errors} = useForm({
        name: '',
        email: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('employees.store'),
            // {onSuccess: () => reset()}
        )
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name"
                                           className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="given-name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="email"
                                           className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2"/>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <PrimaryButton>Save</PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
