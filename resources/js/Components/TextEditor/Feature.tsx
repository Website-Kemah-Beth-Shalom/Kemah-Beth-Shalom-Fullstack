import { Node, mergeAttributes } from '@tiptap/core';
import { Editor, RawCommands } from '@tiptap/react';
// import { toggleBlockType } from '@tiptap/commands'
import { Extension } from '@tiptap/react';

export const StarNode = Node.create({
    name: 'customNode',

    // defaultOptions: {
    //     HTMLAttributes: {
    //         class: 'star',

    //     },
    // },

    addOptions() {
        return {
            HTMLAttributes: {
                default: null,
            },
        }
    },

    group: 'block',

    content: 'inline*',

    parseHTML() {
        return [
            {
                tag: 'p',
            },
        ]
    },


    renderHTML({ HTMLAttributes }) {
        return ['p', {
            ...HTMLAttributes,
            class: 'star',
            // className: 'star',
        }, 0]
    },

})


// add tiptap button to expand the editor view to full screen

// export const FullScreenButton = Extension.create({
//     name: 'fullScreenButton',

//     // ... (keep your existing methods if needed)

//     addCommands() {
//         return {
//             toggleFullScreen: () => ({ editor } : any) => {
//                 // Implement the logic to toggle fullscreen here
//                 if (!document.fullscreenElement) {
//                     editor.view.dom.requestFullscreen().catch((err : any)=> {
//                         console.error(`Error attempting to enable full-screen mode: ${err.message}`);
//                     });
//                 } else {
//                     document.exitFullscreen();
//                 }
//                 return true;
//             },
//         }
//     },

//     addKeyboardShortcuts() {
//         return {
//             'Mod-Alt-f': () => this.editor.commands.toggleFullScreen(),
//         }
//     },

//     // Assuming you're using React, you'd render your button component differently
//     addNodeView() {
//         // Implement Node View for React
//         // You might need to create a custom Node View Renderer for React
//     },
// })