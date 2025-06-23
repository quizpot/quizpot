import { EditorQuizFileContext } from '@/app/editor/page'
import Button from '@/components/ui/Button'
import ColorInput from '@/components/ui/ColorInput'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/Dialog'
import ImageInput from '@/components/ui/ImageInput'
import QuizFileInput from '@/components/ui/QuizFileInput'
import TextAreaInput from '@/components/ui/TextAreaInput'
import TextInput from '@/components/ui/TextInput'
import React, { useContext, useState } from 'react'

/** TODO:
 * enhance settings menu
 */

const EditorHeader = () => {
  const quizFileContext = useContext(EditorQuizFileContext)

  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  const [background, setBackground] = useState<string>(quizFileContext.quizFile.theme.background)

  return (
    <header className='flex justify-between items-center p-2 shadow'>
      <div className='flex gap-2 items-center'>
        <h1 className='text-2xl font-bold'>Quizpot Editor</h1>
        <div className='bg-gray-300 w-[1px] h-8'></div>
        <span className='text-xl'>{ quizFileContext?.quizFile.title }</span>
      </div>
      
      <div className='flex gap-2 items-center'>
        <Dialog>
          <DialogTrigger>
            Settings
          </DialogTrigger>
          <DialogContent>
            <DialogHeader title="Settings" />
            <section className="relative flex-grow overflow-y-auto">
              <div className='w-full h-full p-4 flex flex-col gap-4'>
                <div className='flex gap-4 items-center'>
                  <h1 className='text-xl whitespace-nowrap'>Title</h1>
                  <TextInput
                    value={ quizFileContext.quizFile.title }
                    onChange={(e) => { 
                      quizFileContext.setQuizFile({
                        ...quizFileContext.quizFile, // ✅ Creates a new object
                        title: e.target.value // ✅ Updates only the title
                      })
                    }} 
                  />
                </div>
                <div className='flex gap-4 items-center'>
                  <h1 className='text-xl whitespace-nowrap'>Description</h1>
                  <TextAreaInput
                    value={ quizFileContext.quizFile.description }
                    onChange={(e) => { 
                      quizFileContext.setQuizFile({
                        ...quizFileContext.quizFile,
                        description: e.target.value
                      })
                    }} 
                  />
                </div>
                <div className='flex gap-4 items-center'>
                  <h1 className='text-xl whitespace-nowrap'>Background</h1>
                  <ColorInput
                    value={ quizFileContext.quizFile.theme.background }
                    onChange={(e) => { 
                      setBackground(e.target.value)
                    }} 
                  />
                  <ImageInput
                    onChange={(e) => { 
                      const files = e.target?.files

                      if (!files || files.length === 0) {
                        alert("Please select a valid file")
                        return
                      }

                      const file = files[0]
                      
                      if (file) {
                        const reader = new FileReader()
                        reader.readAsDataURL(file)
                        reader.onload = () => {
                          setBackground(reader.result as string)
                        }

                        reader.onerror = (error) => {
                          console.error("Error converting file to base64:", error);
                        }

                        quizFileContext.setQuizFile({
                          ...quizFileContext.quizFile,
                          theme: {
                            ...quizFileContext.quizFile.theme,
                            background: e.target.value
                          }
                        })
                      } else {
                        alert("Please select a valid file")
                      }
                    }} 
                  />
                  <Button onClick={() => {
                    quizFileContext.setQuizFile({
                      ...quizFileContext.quizFile,
                      theme: {
                        ...quizFileContext.quizFile.theme,
                        background: background
                      }
                    })
                  }} variant="primary">
                    Apply
                  </Button>
                </div>
                <div className='flex gap-4 items-center'>
                  <h1 className='text-xl whitespace-nowrap'>Load from file</h1>
                  <QuizFileInput
                    onChange={(e) => {
                      const files = e.target?.files;

                      if (!files || files.length === 0) {
                        alert("Please select a valid file");
                        return;
                      }

                      const file = files[0];

                      if (file) {
                        const reader = new FileReader();

                        // This is the crucial part: move your logic here
                        reader.onload = (loadEvent) => {
                          try {
                            // 'loadEvent.target.result' contains the file content as a string
                            const fileContent = loadEvent.target?.result as string;

                            // Set background (if applicable)
                            setBackground(fileContent);

                            // Parse the JSON object
                            const jsonObject = JSON.parse(fileContent);

                            // Update the quiz file context
                            // Ensure that jsonObject truly matches your QuizFile type structure
                            quizFileContext.setQuizFile({
                              ...jsonObject,
                            });

                          } catch (error) {
                            console.error("Error parsing JSON or setting quiz file:", error);
                            alert("Error processing file: " + (error instanceof Error ? error.message : "Invalid JSON format."));
                          }
                        };

                        reader.onerror = (errorEvent) => {
                          console.error("Error reading file:", errorEvent);
                          alert("Error reading file. Please try again.");
                        };

                        // Start reading the file
                        reader.readAsText(file);

                      } else {
                        alert("Please select a valid quiz file");
                      }
                    }}
                  />
                </div>
              </div>
            </section>
          </DialogContent>
        </Dialog>
        <div className='bg-gray-300 w-[1px] h-8'></div>
        <div className='flex gap-1'>
          <Button href='/' variant="secondary">
            Exit
          </Button>
          <Button onClick={() => {
            /** modal with local storage save or file export */
            var a = document.createElement("a");
            const jsonString = JSON.stringify(quizFileContext.quizFile, null, 2);
            var file = new Blob([jsonString], {type: 'text/json'});
            a.href = URL.createObjectURL(file);
            a.download = quizFileContext.quizFile.title + '.qp';
            a.click();
          }} variant="primary">
            Save
          </Button>
        </div>
      </div>
    </header>
  )
}

export default EditorHeader