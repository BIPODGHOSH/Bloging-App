import { useState, useRef, useEffect } from 'react';
import { collection, doc, setDoc, onSnapshot,deleteDoc } from "firebase/firestore";
import { db } from '../firebaseInit';

//Blogging App using Hooks
export default function Blog() {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [blogs, setBlogs] = useState([]);
    const titleRef = useRef(null);



    useEffect(() => {
        titleRef.current.focus(); //initial focus on title when we render first time 
    }, [])



    useEffect(() => {

        onSnapshot(collection(db, "blogs"), (snapShot) => {
            // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            

            const blogs = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            console.log(blogs);
            setBlogs(blogs);
            // console.log(source, " data: ", doc.data());
        });
        // async function fetchData(){
        //     const snapShot =await getDocs(collection(db, "blogs"));
        //     // console.log(snapShot);

        //     const blogs = snapShot.docs.map((doc) => {
        //         return{
        //             id: doc.id,
        //             ...doc.data()
        //         }
        //     })
        //     console.log(blogs);
        //     setBlogs(blogs);
        // }

        // fetchData();
    }, [])

    useEffect(() => {
        if (blogs.length && blogs[0].title) {
            document.title = blogs[0].title;
        } else {
            document.title = "Blogs App";
        }
    })


    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e) {
        e.preventDefault();
        titleRef.current.focus();  // for focus back on title after submit the form

        //setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
        // Add a new document with a generated id.
        const docRef = doc(collection(db, "blogs"));
        await setDoc(docRef, {
            Title: formData.title,
            Content: formData.content,
            CreatedOn: new Date()
        });
        // console.log("Document written with ID: ", docRef.id);

        setFormData({ title: '', content: '' }); //for after form submition clear the preveus form   
    }

    const handelDelete = async(id) => {
        // setBlogs(blogs.filter((blog) => id !== blog.id));
        // dispatch({ type: 'REMOVE', index: i })
        await deleteDoc(doc(db, "blogs", id));
    }

    return (
        <>
            {/* Heading of the page */}

            <h1>Write a Blog!</h1>

            {/* Division created to provide styling of section to the form */}
            <div className="section">

                {/* Form for to write the blog */}
                <form onSubmit={handleSubmit}>

                    {/* Row component to create a row for first input field */}
                    <Row label="Title">
                        <input
                            className="input"
                            placeholder="Enter the Title of the Blog here.."
                            value={formData.title}
                            required
                            ref={titleRef}
                            onChange={(e) => setFormData({ title: e.target.value, content: formData.content })}
                        />
                    </Row >

                    {/* Row component to create a row for Text area field */}
                    <Row label="Content">
                        <textarea
                            className="input content"
                            placeholder="Content of the Blog goes here.."
                            value={formData.content}
                            required
                            onChange={(e) => setFormData({ title: formData.title, content: e.target.value })}
                        />
                    </Row >

                    {/* Button to submit the blog */}
                    <button className="btn">ADD</button>
                </form>

            </div>

            <hr />

            {/* Section where submitted blogs will be displayed */}
            <h2> Blogs </h2>

            {blogs.map((blog, i) => (
                <div className='blog' key={i}>
                    <h3>{blog.Title}</h3>
                    <p>{blog.Content}</p>
                    <button
                        className='remove btn'
                        onClick={() => handelDelete(blog.id)}
                    >Delete</button>
                </div>
            ))}

        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props) {
    // console.log(props)
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    )
}
