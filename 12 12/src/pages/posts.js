import React from "react";

function Posts() {
    return (
        <div className="home">
            <header>Car spotting Skórzewo Blog</header>
            <h2>Posts:</h2>

            <div className="post">
                <h1>SzybkiNarciarz</h1>
                <p>Ostatnio widziałem jakiegos pirata w audi tt jadacego przez junikowo. Naszczescie wjechal w barierke i auto do kasacji,
                    takim wariatom powinni zabierac prawo jazdy!!!11!!</p>
            </div>

            <div className="post">
                <h1>SzybkiNarciarz</h1>
                <p>daj mu! daj mu!</p>
            </div>
            <div className="post">
                <h1>SzybkiNarciarz</h1>
                <p>no taka beta jechala swietym marcinem, że bym ją mrasnął(m3, kolor czarny, dokładki emitujące carbon)</p>
            </div>

            <footer>
                <p>Socials:
                    <a href="https://www.tiktok.com/@dajmu_dajmu/video/7409749518675184928" target="_blank"
                       rel="noopener noreferrer">
                        <img src="/tiiktok2" alt="tiktok"/>
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default Posts;
