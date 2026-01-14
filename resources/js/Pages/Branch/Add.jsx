import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';
import Select from 'react-select';
import 'react-phone-input-2/lib/style.css';

export default function Add({  countries}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        code: '',
        type: 1,
        country: '',
        city: '',
        address: '', 
        contanct_no: '',
        email: '',
        logo: null,
        national_tax: '',
        sale_tax: '',
        status: 'active',
        currency: '',
       
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('branch.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                    showNotification('Branch Added successfully!', 'success', 2000);
            },
            onError: (errors) => {
                console.log('errors', errors);
                showNotification('Branch  failed!', 'error', 3000);
            },
        });
    };
    
    const countriesOptions = countries.map(country => ({
        value: country.name,
        label: country.name
    }));
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Branch
                </h2>
            }
        >
            <Head title="Branch" />
            <>
                <AddItemBreadCrums routeName="branch.create" name="Add Branch" details="Add Branch for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={submit}>
                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className="form-control"
                                                autoComplete="name"
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">

                                            <label htmlFor="code">Code</label>
                                            <input
                                                id="code"
                                                name="code"
                                                value={data.code}
                                                className="form-control"
                                                autoComplete="code"
                                                onChange={(e) => setData('code', e.target.value)}
                                            />
                                            {errors.code && <div className="text-danger">{errors.code}</div>}
                                        </div>
                                         <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="country">Country</label>
                                             <Select
                                                options={countriesOptions}
                                                value={countriesOptions.find(c => c.value === data.country)}
                                                onChange={(selected) => setData('country', selected?.value || '')}
                                                isSearchable={true}
                                                placeholder="Select country..."
                                            />
                                            {errors.country && <div className="text-danger">{errors.country}</div>}
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="row mt-4">
                                         <div className="col-lg-4 col-sm-6">

                                            <label htmlFor="city">City</label>
                                            <input
                                                id="city"
                                                name="city"
                                                value={data.city}
                                                className="form-control"
                                                autoComplete="city"
                                                onChange={(e) => setData('city', e.target.value)}
                                            />
                                            {errors.city && <div className="text-danger">{errors.city}</div>}
                                        </div>
                                        <div className="col-lg-8 col-sm-8">
                                            <label htmlFor="address">Address</label>
                                            <input
                                                id="address"
                                                type="text"
                                                name="address"
                                                className="form-control"
                                                onChange={(e) => setData('address', e.target.value)}
                                            />
                                            {errors.address && <div className="text-danger">{errors.address}</div>}
                                        </div>
                                        
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="contanct_no">Contact number</label>
                                            <input
                                                id="contanct_no"
                                                type="text"
                                                name="contanct_no"
                                                className="form-control"
                                                onChange={(e) => setData('contanct_no', e.target.value)}
                                            />
                                            {errors.contanct_no && <div className="text-danger">{errors.contanct_no}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                id="email"
                                                type="text"
                                                name="email"
                                                className="form-control"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </div>
                                         <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="logo">Logo</label>
                                            <input
                                                id="logo"
                                                type="file"
                                                name="logo"
                                                className="form-control"
                                                onChange={(e) => setData('logo', e.target.files[0])}
                                            />
                                            {errors.logo && <div className="text-danger">{errors.logo}</div>}
                                        </div>
                                       
                                    </div>
                                     <div className="row mt-4">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="national_tax">National Tax</label>
                                            <input
                                                id="national_tax"
                                                type="text"
                                                name="national_tax"
                                                className="form-control"
                                                onChange={(e) => setData('national_tax', e.target.value)}
                                            />
                                            {errors.national_tax && <div className="text-danger">{errors.national_tax}</div>}
                                        </div>
                                         <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="sale_tax">Sale Tax</label>
                                            <input
                                                id="sale_tax"
                                                type="text"
                                                name="sale_tax"
                                                className="form-control"
                                                onChange={(e) => setData('sale_tax', e.target.value)}
                                            />
                                            {errors.sale_tax && <div className="text-danger">{errors.sale_tax}</div>}
                                        </div>
                                         <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="currency">Currency</label>
                                            <input
                                                id="currency"
                                                type="text"
                                                name="currency"
                                                className="form-control"
                                                onChange={(e) => setData('currency', e.target.value)}
                                            />
                                            {errors.currency && <div className="text-danger">{errors.currency}</div>}
                                        </div>
                                    </div>
                                    
                                    <div className="text-end mt-3">
                                        <button className="btn btn-primary" type="submit" disabled={processing}>
                                            Submit
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthenticatedLayout>
    );
}
