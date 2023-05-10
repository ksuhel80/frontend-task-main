import  React,{useState, useEffect} from 'react';
import Sidebar from '../Sidebar';
import CreateContact from './Contact/CreateContact';
import EditContact from './Contact/EditContact';
import ContactList from './Contact/ContactList';
import cross from '../../cross.png'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { contact, deleteContact } from '../../store/contact';
import Maps from './Maps';

export interface IAppProps {
}

export default function Contact (props: IAppProps) {
    const [createContact, setCreateContact] = useState<boolean>(false);
    const [editContact, setEditContact] = useState<boolean>(false);
    const [editData, setEditData] = useState<contact>({id:1,firstName:'hello',lastName:'hello',statuses:'active'}); 

    const contacts = useAppSelector(state=> state.contact.contacts)
    const dispatch = useAppDispatch();
    
    useEffect(() => {
 
    console.log(contacts)
    
    }, [contacts])
    

    const handleCreate = () => {
        setCreateContact(false)
      };


      const handleEdit = () => {
        setEditContact(false);
      };

      const handleDelete = (id:number) => {
        dispatch(deleteContact({id}))
      };
  return (
    <div className='flex w-[100%]'>
        <div className=' w-[20%] h-[100vh]' > 
      <Sidebar />
      </div>
      <div className='w-[80%] flex items-start justify-center mt-14'>
      
        {
            createContact ? 
            (<CreateContact handleCreate={handleCreate}  />)  : editContact ? 
            (<EditContact handleEdit={handleEdit} editData={editData}/>) :
            (
             <div className='w-[100%]'>
                <div className='flex items-center justify-center'>
                <button className='border-gray-500 rounded-md border-2 p-2 bg-slate-300 shadow-lg mb-5' onClick={()=>setCreateContact(true)}>Create Contact</button>
</div>
                <hr className='w-[100%] border-1 '></hr>
                
               {contacts.length <= 0 && <div className='flex items-center justify-center m-20 border-2 border-gray-300 gap-4 p-10 rounded-md'>
                    <img src={cross} className='h-20 w-20 bg-white' ></img>
                   
                    <div className='flex items-center justify-center'>
                        No Contact Found Please Add Contact from Create Contact Button
                    </div>
                </div>}
                {contacts.length > 0 && <h1 className='flex items-center justify-center text-3xl mt-4'>Contacts</h1> }
              <div className='flex w-full items-center justify-start ml-2 mt-4 gap-9 flex-wrap'>
               
                { contacts.length > 0 && 
                (
                  contacts.map(item => (
                    <div className='flex w-auto flex-col  border-2 border-gray-300 rounded-md p-3 min-w-fit grid-cols-3' >
                     <p>First Name: {item.firstName}</p>
                     
                     <p className='mb-2'>Last Name: {item.lastName}</p>
                     <div >
                     <p> <button className='border-2 border-green-300 rounded-md px-2 mb-2' onClick={()=>{setEditContact(true)
                      setEditData(item)
                      }}>Edit</button></p>
                      
                      <p>
                      <button className='border-2 border-red-300 rounded-md px-2' onClick={()=>handleDelete(item.id)}>Delete</button></p>
                    </div></div>
                  ))
                )
                }</div>
             </div>   
                )
        }
      </div>
    </div>
  );
}
