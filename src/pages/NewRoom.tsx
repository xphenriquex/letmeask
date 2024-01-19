import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { push, ref } from 'firebase/database';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState('');

  async function handleNewRoom(event: FormEvent) {
    event.preventDefault();
    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = ref(database, 'rooms');
    const firabaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/rooms/${firabaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizandio perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="let me ask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleNewRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
