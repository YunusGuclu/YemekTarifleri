import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import TarifDetay from './TarifDetay'; // Detay bileşeni

function App() {
    const [categories, setCategories] = useState([]);
    const [tarifler, setTarifler] = useState([]);
    const [weather, setWeather] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories/')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));

        axios.get('http://127.0.0.1:8000/api/tarifler/')
            .then(response => setTarifler(response.data))
            .catch(error => console.error('Error fetching tarifler:', error));

        axios.get('http://127.0.0.1:8000/api/weather/')
            .then(response => setWeather(response.data[0]))
            .catch(error => console.error('Error fetching weather data:', error));
    }, []);

    const displayTarifler = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return tarifler.slice(startIndex, endIndex);
    };

    const setupPagination = () => {
        const pageCount = Math.ceil(tarifler.length / itemsPerPage);
        const paginationItems = [];
        for (let i = 1; i <= pageCount; i++) {
            paginationItems.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={(e) => handlePageClick(e, i)}>{i}</button>
                </li>
            );
        }
        return paginationItems;
    };

    const handlePageClick = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
    };

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">Yemek Tarifi</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Ana Sayfa</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/hakkinda">Hakkında</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/iletisim">İletişim</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="sidebar">
                    <Link to="/" className="active">Ana Sayfa</Link>
                    {categories.map(category => (
                        <a key={category.id} href="#">{category.name}</a>
                    ))}
                </div>

                <div className="content">
                    <Routes>
                        <Route exact path="/" element={
                            <>
                                <header className="jumbotron text-center mb-4">
                                    <h1 className="display-4">Hoşgeldiniz</h1>
                                    <p className="lead">En lezzetli yemek tarifleri burada!</p>
                                </header>

                                <div className="container">
                                    <h2 className="text-center mb-4">Popüler Tarifler</h2>
                                    <div className="row" id="tarifler-container">
                                        {displayTarifler().map(tarif => (
                                            <div key={tarif.id} className="col-md-4 tarif-card">
                                                <div className="card mb-4 shadow-sm">
                                                    <Link to={`/tarif/${tarif.slug}`} className="btn btn-outline-primary">
                                                        <img src={tarif.resim} className="card-img-top" alt={tarif.ad} />
                                                    </Link>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{tarif.ad}</h5>
                                                        <p className="card-text">{tarif.aciklama}</p>
                                                        <Link to={`/tarif/${tarif.slug}`} className="btn btn-outline-primary">Detaylar</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <nav aria-label="Page navigation">
                                        <ul className="pagination justify-content-center" id="pagination-container">
                                            {setupPagination()}
                                        </ul>
                                    </nav>
                                </div>

                                <footer className="footer">
                                    <div className="container p-4">
                                        <div className="row">
                                            <div className="col-lg-12 mb-4 mb-md-0">
                                                <h5 className="text-uppercase">Yemek Tarifi Sitesi</h5>
                                                <p>En lezzetli tarifler için bizi takip edin.</p>
                                            </div>
                                        </div>
                                        {weather && (
                                            <div className="weather-container">
                                                <h5>Elazığ Hava Durumu</h5>
                                                <p>
                                                    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather Icon" />
                                                    {weather.city}: {weather.temperature}°C, {weather.description}
                                                </p>
                                                <p>Rüzgar Hızı: {weather.wind_speed} m/s</p>
                                                <p>Nem: {weather.humidity}%</p>
                                                <p>Basınç: {weather.pressure} hPa</p>
                                            </div>
                                        )}
                                        <div className="text-center p-3 bg-dark text-light">
                                            © 2024 Yemek Tarifi Sitesi
                                        </div>
                                    </div>
                                </footer>
                            </>
                        } />
                        <Route path="/tarif/:slug" element={<TarifDetay />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
