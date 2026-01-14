import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link,Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
 <main>

    
        <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div class="container">
                <div class="row justify-content-center form-bg-image">
                    <p class="text-center">
                        <Link href="/login" class="d-flex align-items-center justify-content-center">
                        <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                        Back to log in
                        </Link>
                    </p>
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <div class="signin-inner my-3 my-lg-0 bg-white shadow border-0 rounded p-4 p-lg-5 w-100 fmxw-500">
                            <h1 class="h3">Forgot your password?</h1>
                            <p class="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                             {status && (
                                    <div class="mb-4 text-sm font-medium text-green-600">
                                        {status}
                                    </div>
                                )}
                            <form onSubmit={submit}>
                                
                                <div class="mb-4">
                                    <label htmlFor="email">Your Email</label>
                                    <div class="input-group">
                                        <input type="email"  onChange={(e) => setData('email', e.target.value)} value={data.email} class="form-control" id="email" placeholder="john@company.com" required autofocus />
                                    </div> 
                                    <InputError message={errors.email} class="mt-2" />
                                     
                                </div>
                              
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-gray-800">  Email Password Reset Link</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
            
        </GuestLayout>
    );
}
