import { CiSearch } from "react-icons/ci";

export default function Search(props) {
    const handleSubmit = (e) => {
        e.preventDefault()
        props.onSearch(props.value);
    };
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search"
                onChange={props.onChangeSearch}
                className="input input-bordered input-primary w-full max-w-xs "
                value={props.value}
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleSubmit}
            >
                <CiSearch />
            </button>
        </div>
    );
}