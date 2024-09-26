import { Button } from '@/components/ui/button'
import { useCurrentEditor } from '@tiptap/react'
import {
    Bold,
    Italic,
    Heading,
    Quote,
    List,
    ListOrdered,
    Code,
    Strikethrough,
    Text,
    Undo,
    Redo,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Braces,
    Minus
} from 'lucide-react'


export default function MenuBar() {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group space-x-1">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <Bold className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <Italic className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    <Strikethrough className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    <Code className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    <Text className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    <Heading1 className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    <Heading2 className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    <Heading3 className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    <Heading4 className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                    <Heading5 className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                    <Heading6 className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    <List className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    <ListOrdered className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    <Braces className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    <Quote className='w-5 h-5' />
                </Button>
                <Button variant="outline" size="icon" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    <Minus className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    <Undo className='w-5 h-5' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    <Redo className='w-5 h-5' />
                </Button>
                {/* <Button
                    variant='outline'
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
                >
                    Purple
                </Button> */}
            </div>
        </div>
    )
}