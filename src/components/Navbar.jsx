export default function Navbar() {
    return (
        <>
            <div className="navbar bg-base-100 py-4">
                <div className="flex-1">
                    <a className="btn btn-ghost text-2xl text-white">My Personal Notes</a>
                </div>
                <div className="flex-none me-1">
                    <label className="input input-bordered border-primary hidden xl:flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Cari Catatan..." />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
            </div>
        </>
    )
}