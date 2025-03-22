import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function KategoriTarifler() {
    const { slug } = useParams();
    const [tarifler, setTarifler] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/categories/${slug}/tarifler/`)
            .then(response => setTarifler(response.data))
            .catch(error => console.error('Error fetching category recipes:', error));
    }, [slug]);

    return (
        <div className="container">
            <header className="jumbotron text-center mb-4">
                <h1 className="display-4">Kategori: {slug}</h1>
            </header>

            <div className="row">
                {tarifler.map(tarif => (
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
        </div>
    );
}

export default KategoriTarifler;
