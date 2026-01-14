import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
           

            <div class="py-1">
                <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            class="max-w-xl"
                        />
                    </div>

                    <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm class="max-w-xl" />
                    </div>

                    <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        {/* <DeleteUserForm class="max-w-xl" /> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
