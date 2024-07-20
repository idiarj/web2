

export function ProjectsPreview({id, name, members, owner}){

    return (
        <div>
            <label>{id}</label>
            <label>{name}</label>
            <label>{members}</label>
            <label>{owner}</label>
        </div>
    )
}