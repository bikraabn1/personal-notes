export default function Card(props) {

    const showFormattedDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
        return new Date(date).toLocaleDateString("id-ID", options)
    }

    return (
        <div className="card bg-base-100 w-[18.5rem] min-h-[25rem] shadow-xl p-5 flex flex-col justify-between border border-primary ">
            <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-2xl text-white">{props.title}</h2>
                <p>{showFormattedDate(props.createdAt)}</p>
                <p className="text-white">{props.body}</p>
            </div>
            <div className="flex gap-2 justify-self-end">
                <button className="btn btn-error" onClick={props.deleteButton}>Hapus</button>
                <button className="btn btn-warning" onClick={props.archiveButton}>{props.isArchive}</button>
            </div>
        </div>
    )
}