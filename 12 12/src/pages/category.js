import React from "react";

function Category() {
    return (
        <div className="home">
            <header>Car spotting Skórzewo Blog</header>
            <h2>Categories:</h2>
            <p> Kategorie postów dostepne na naszym blogu:
                <ul>
                    <li>zdjecia fur</li>
                    <li>przemyslenia prowadzacego</li>
                    <li>opisy fur(jak nie zdążyłem zrobić zdjecia)</li>
                </ul>
            </p>
            <footer>
                <p>Socials:
                    <a href="https://www.tiktok.com/@dajmu_dajmu/video/7409749518675184928" target="_blank">
                        <img src="/tiiktok2" alt="tiktok"/>
                    </a>
                </p>

            </footer>
        </div>
    );
}

export default Category;