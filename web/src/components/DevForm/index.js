import React, { useState, useEffect } from 'react';
import './styles.css';
function DevForm({ onSubmit }) {

    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');// variavel começa com uma string vazia
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position)/*retorna posição*/ => {
            const { latitude, longitude} = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 3000,
          }
        );
        }, []);

        async  function handleSubmit(e){
            e.preventDefalut();//como o formulario no html tem um comportamento padrão q é enviar o usuario pra uma outra tela
                                //a gente evita esse comportamento atravez dessa função

            await onSubmit({
                github_username,
                techs,
                latitude,
                longitude
      
              
            });

            setGithub_username('');
            setTechs('');
        }

    return (
        <form onSubmit={handleSubmit}>
            <div /*class tb é uma palavra reservada do js*/ className="input-block">
            
                <label htmlFor/*por o For ser uma palavra reservada do js, ultiliza o ''html'' antes*/="github_username">Usuário do GitHub</label>
                <input
                    name="github_username"
                    id="github_username"
                    required// por ser um campo obrigatorio , entao usa require
                    value={github_username}
                    onChange={e => setGithub_username(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    /* toda vez que ele mudar o valor do nosso latitude,pega o evento do html e da um set */onChange={e => setTechs(e.target.value)}
                    // é a forma de armazenar um valor de um input dentro de um estado
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="">Longitude</label>
                    <input type="number"
                        name="longitude"
                        id="longitude"
                        required value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>

            </div>

            <button type="submit">Salvar</button>


        </form>
    );
}

export default DevForm;