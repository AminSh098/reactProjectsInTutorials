import { Link, Form, redirect } from 'react-router-dom';
 
import classes from './NewPostStyles.module.css';
import Modal from '../components/Modal';

function NewPost() {

    return (
        <Modal>
            <Form method='post' className={classes.form}>
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea id="body" required rows={3} name="body" placeholder="Say something.."/>
                </p>
                <p>
                    <label htmlFor="name">Your name</label>
                    <input className="name" type="text" placeholder="Amin" id="name" name="author" required/>
                </p>
                <p className={classes.action}>
                    <Link to=".." className="links">Cancel</Link>
                    <button>Submit</button>
                </p>
            </Form>
        </Modal>
    );
}

export default NewPost

export async function action ({request}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData); // { body: { ... }, author: { ... } }  
    await fetch('http://localhost:8080/posts',{
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return redirect('/');
}