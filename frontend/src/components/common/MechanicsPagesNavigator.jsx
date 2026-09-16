export function MechanicsPagesNavigator({pages}) {
    return (
        <>
            <button type="button">Previous</button>
            {pages.map((page) => (
                <button key={page}>{page}</button>
            ))}
            <button type="button">Next</button>
        </>
    )
}