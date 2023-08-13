export default function Help() {
    return (
        <div className="container">
            <div>
                Welcome to the Help Page for our Crystal E-commerce App!
            </div>
            <h2>Frequently Asked Questions:</h2>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            How can I browse and search for crystals ?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            To browse our collection of crystals, simply navigate to the "Shop" section of the app.You can filter crystals by type, size, color, or price range.If you're looking for a specific crystal, use the search bar at the top of the page to enter its name or keywords.
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}