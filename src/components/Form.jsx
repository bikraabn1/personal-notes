import React from 'react';

export default function Form(props) {
    return (
        <form 
            className="w-full max-w-lg mx-auto mt-5 flex flex-col justify-center items-center gap-4 md:w-[25rem] lg:w-[30rem] p-5 rounded-lg border border-primary shadow-lg"
            onSubmit={props.onSubmit}
        >
            <h2 className="font-semibold text-2xl text-white mb-2">Buat Catatan</h2>
            <p className="w-full text-end text-sm text-gray-300">sisa karakter: {props.char}</p>
            <div className="w-full">
                <input
                    type="text"
                    placeholder="Judul catatan"
                    className="input input-bordered input-md w-full"
                    value={props.title}
                    onChange={props.onChangeTitle}
                    required
                />
            </div>
            <div className="w-full">
                <textarea 
                    className="textarea textarea-bordered w-full h-32" 
                    placeholder="Tuliskan Catatan Anda" 
                    value={props.body} 
                    onChange={props.onChangeBody}
                    required
                />
            </div>
            <button className="btn btn-primary w-full sm:w-auto">Submit</button>
        </form>
    )
}