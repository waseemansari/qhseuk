import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            

            

            {/* ///////// */}
             <main>

       
        <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div class="container">
                {status && (
                    <div class="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
                <div class="row justify-content-center form-bg-image" >
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <div class="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div class="text-center text-md-center mb-4 mt-md-0">
                                <h1 class="mb-0 h3">Sign in to our platform</h1>
                            </div>
                            <form action="#" class="mt-4" onSubmit={submit}>
                                <div class="form-group mb-4">
                                    <label htmlFor="email">Your Email</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1">
                                            <svg class="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                        </span>
                                        <input type="email" 
                                            value={data.email}
                                            name="email"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                            class="form-control" placeholder="example@company.com" id="email" autofocus required
                                        />
                                        <InputError message={errors.email} class="mt-2" />
                                    </div>  
                                </div>
                              
                                <div class="form-group">
                                    
                                    <div class="form-group mb-4">
                                        <label htmlFor="password">Your Password</label>
                                        <div class="input-group">
                                            <span class="input-group-text" id="basic-addon2">
                                                <svg class="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                                            </span>
                                            <input type="password" 
                                                name="password"
                                                value={data.password}
                                               
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Password" class="form-control" id="password" required />
                                            <InputError message={errors.password} class="mt-2" />

                                        </div>  
                                    </div>
                                    
                                    <div class="d-flex justify-content-between align-items-top mb-4">
                                        <div class="form-check">
                                            
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData('remember', e.target.checked)
                                                }
                                            />
                                           <label class="form-check-label mb-0" htmlFor="remember">
                                              Remember me
                                            </label>
                                        </div>
                                        <div>
                                             {canResetPassword && (
                                                <Link
                                                    href={route('password.request')}
                                                    class="small text-right"
                                                >
                                                    Forgot your password?
                                                </Link>
                                             )}
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="d-grid">
                                    <PrimaryButton class="btn btn-gray-800" disabled={processing}>
                                        Sign in
                                    </PrimaryButton>
                                    
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
