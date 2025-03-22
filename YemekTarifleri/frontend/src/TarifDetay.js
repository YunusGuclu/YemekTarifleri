import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TarifDetay() {
    const { slug } = useParams();
    const [tarif, setTarif] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/tarifler/${slug}/`)
            .then(response => setTarif(response.data))
            .catch(error => console.error('Error fetching tarif:', error));
    }, [slug]);

    if (!tarif) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron text-center mb-4">
                <h1 className="display-4">{tarif.ad}</h1>
            </header>

            <div className="row">
                <div className="col-md-6">
                    <img src={tarif.resim} className="img-fluid" alt={tarif.ad} />
                </div>
                <div className="col-md-6">
                    <h2 className="mb-3">Tarif Detayları</h2>
                    <p><strong>Tarif:</strong> {tarif.aciklama}</p>
                </div>
            </div>
        </div>
    );
}

export default TarifDetay;
