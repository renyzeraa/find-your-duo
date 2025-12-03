import { GameBanner } from "./components/game-banner.tsx";
import * as Dialog from '@radix-ui/react-dialog';
import logoImg from './assets/logo.svg';
import { CreateAdBanner } from "./components/create-ad-banner.tsx";
import { CreateAdModal } from "./components/create-ad-modal.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Game } from "./@types/global";

export function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo estilizada do nlw e-sports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}
