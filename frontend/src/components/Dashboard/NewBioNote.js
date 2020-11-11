import React, { useState } from 'react';
import styled from 'styled-components';
// import QuillEditor from '../../editor/QuillEditor';
import { connect } from 'react-redux';
import { createNewBioNote } from '../../redux/userBioNote/bionoteActions';

//Editor imports:
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

//Styles:

const MainEditorContainer = styled.div`
    padding: 50px 50px;
`

//Render:


const NewBioNote = ({ createNewBioNote }) => {

    //Creating editor state for draftJS editor:
    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

    //Creating state for name input:
    const [ bioName, setBioName ] = useState('');

    const handleNameChange = e => {
        setBioName(e.target.value);
    }
    

    const handleEditorStateChange = editorState => {
        setEditorState(editorState);
    }

    const onEditorSubmit = (e) => {
        e.preventDefault();
        createNewBioNote(bioName, convertToRaw(editorState.getCurrentContent()));
    }


    return (
        <>
            <MainEditorContainer>
                <form onSubmit={onEditorSubmit}>
                    <div>
                        <label htmlFor='bionoteName'>Name of BioNote:  </label>
                        <input
                            name='bionoteName'
                            type='text'
                            placeholder='Enter Name..'
                            value={bioName}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <Editor
                            editorState={editorState}
                            toolbar={{
                                inline: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                image: { previewImage: true },
                            }}
                            onEditorStateChange={handleEditorStateChange}
                        />
                    </div>
                    <button type='submit'>Submit BioNote</button>
                </form>
            </MainEditorContainer>
        </>
    )
}

/*
The main goal here is to:

1. Learn how to save documents into mongoDB into each individual user.
**WE ARE HERE**

We've now learned how to save the user's writing temporarily in the content state. We still need to create routing to our backend that will push this document into the user's stuff. 

https://www.youtube.com/watch?v=AgreDlNaUn4 @ timestamp 38:21 --> He's setting up the model necessary for creating the blog...--> this model is only necessary for when we 'share' the blogs to the people on the app.

**Update: We've currently implemented basic routing and had our _id and contents/file array to be sent over to the backend. It remains unknown whether we can just store this content data 'as is' and then use it to render it back out onto the screen...

**Update: We might have to ditch react-quill much to my dismay. The documentation is pretty nasty, and it doesn't really give good examples. I've found this to be better:
https://jpuri.github.io/react-draft-wysiwyg/#/docs

2. Learn how to load documents into the loading component "createbionote" --> perhaps a simple listing pattern?



3. Learn how to grab HTML info from mongodb and re-render HTML document upon clicking it.. 
4. 





*/

export default connect(null, { createNewBioNote })(NewBioNote);
