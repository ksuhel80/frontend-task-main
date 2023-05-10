import  React,{useState} from 'react';
import { contact } from '../../../store/contact';
import { useAppDispatch } from '../../../store/store';
import { editContact } from "../../../store/contact";


export interface IAppProps {
    handleEdit: () => void,
    editData: contact
}

export default function EditContact (props: IAppProps) {
    const [firstName, setFirstName] = useState<string>(props.editData.firstName);
    const [lastName, setlastName] = useState<string>(props.editData.lastName);
    const [status, setStatus] = useState<string>(props.editData.statuses);
    const [id, setId] = useState<number>(props.editData.id);

    const dispatch = useAppDispatch();

    const handleSubmit = (e:any) =>{
      e.preventDefault();
      dispatch(editContact({id,firstName,lastName,status}))
      props.handleEdit();
    }

  return (
    <div className="w-[80%] flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-2xl font-semibold">Edit Contact</h2>
        <div className="mb-4 flex items-center justify-center ">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-32 mr-3">
            First Name :
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="First Name"
            value={firstName}  
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4  flex items-center justify-center">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-32 mr-3">
            Last Name :
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Last Name"
            value={lastName}  
            onChange={e => setlastName(e.target.value)}
          />
        </div>
        <div className="mb-4  flex items-center justify-center ">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-32 mr-3 text-justify">
            Status :
          </label>
          <div className="mb-4   w-full">
            <input
              type="radio"
              name="theme"
              id="dark-mode"
              className="mr-2 accent-gray-800"
              onChange={()=> setStatus('active')}
              checked={status === 'active'}
            />
            <label className="accent-gray-800">Active</label>

            <input
              type="radio"
              name="theme"
              id="light-mode"
              className="mx-2 accent-gray-800"
              onChange={()=> setStatus('Inactive')}
              checked={status === 'Inactive'}
            />
            <label className="accent-gray-800">Inactive</label>
          </div>
          <div></div>
        </div>
        <button className='border-gray-500 rounded-md border-2 p-2 bg-slate-300 shadow-lg mb-5' type='submit'> Save Editted Contact </button>
      </form>
    </div>
  );
}