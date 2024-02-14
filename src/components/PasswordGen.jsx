import React, {useCallback, useEffect, useRef, useState} from "react";


const PasswordGen = () => {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState(8)
    const [isNumber, setIsNumber] = useState(true)
    const [isSpecialChar, setIsSpecialChar] = useState(false)
    const passRef = useRef()


    const generatePassword = useCallback(() => {
        let pass = ""
        let allowedString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(isNumber) allowedString += "0123456789"
        if(isSpecialChar) allowedString += "!@#%^&*()<>/?"

        for(let i=0; i<length; i++){
            const randomIndex = Math.floor(Math.random() * allowedString.length);
            pass += allowedString[randomIndex]
        }
        
        setPassword(pass)

    }, [length, isNumber, isSpecialChar])

    const copyPassword = useCallback(() => {
        passRef.current?.select()
        window.navigator.clipboard.writeText(password)
    }, [password])

    useEffect(() => {
        generatePassword()
    }, [length, isNumber, isSpecialChar])

    return <div className="container mx-auto">
    <div className="bg-gray-700 flex justify-center items-center min-h-screen">
        <div className="bg-gray-200 shadow-md px-8 pt-6 pb-8 mb-4 items-center">
            <div className="flex shadow overflow-hidden mb-4">
                <input
                    type="text"
                    value={password}
                    className="outline-none w-full min-w-96 py-1 px-3"
                    placeholder="Password"
                    readOnly
                    ref={passRef}
                />
                <button 
                    className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
                    onClick={copyPassword}
                    >Copy</button>
            </div>
            <div className="flex gap-4">
                <div className='flex items-center gap-x-1'>
                    <input 
                        onChange={(e) => {setLength(e.target.value)}}
                        value={length}
                        type="range"
                        min={6}
                        max={100}
                        className='cursor-pointer'
                    />
                    <label>Length: {length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                        onChange={() =>setIsNumber((v) => !v) }
                        defaultChecked={isNumber}
                        type="checkbox"
                        id="numberInput"
                    />
                    <label htmlFor="numberInput">Numbers</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                        onChange={() =>setIsSpecialChar((v) => !v) }
                        defaultChecked={isSpecialChar}
                        type="checkbox"
                        id="characterInput"
                    />
                    <label htmlFor="characterInput">Characters</label>
                </div>
            </div>
            <div className="flex">
                <button 
                    className="outline-none bg-blue-700 text-white px-3 py-0.5 mt-5 shrink-0"
                    onClick={() => generatePassword()}>
                        Regenerate
                </button>
            </div>
        </div>
    </div>
</div>
};

export default PasswordGen;
