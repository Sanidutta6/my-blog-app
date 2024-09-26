import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react';
import MenuBar from './MenuBar'

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({}),
]

const editorProps = {
    attributes: {
        class: 'prose prose-invert max-w-none rounded-md border min-h-[250px] border-input px-6 py-2',
    },
}

export default function TiptapEditor({ content, onChange }) {
    return (
        <EditorProvider
            slotBefore={<MenuBar />}
            extensions={extensions}
            content={content}
            editorProps={editorProps}
            onUpdate={({ editor }) => {
                onChange(editor.getHTML())
                // console.log(editor.getHTML())
            }} />
    )
}