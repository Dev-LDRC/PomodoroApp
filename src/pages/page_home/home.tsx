import { useState, useEffect, useRef } from 'react';
// import { DialogUserSettings } from './components/dialog';
import Button from '../../components/buttons';

export default function Home() {
  const [initPomodoro, setInitPomodoro] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isUserPause, setUserPause] = useState<boolean>(false);
  const [isRest, setIsRest] = useState<boolean>(false);
  const [cycles, setCycles] = useState<number>(0);
  const [inputUserTarget, set_inputUserTarget] = useState<string>('');
  const [currentTargetUser, setCurrentTargetUser] = useState<string>('In inprovement 🚀');

  const ref_inputTargetUser = useRef<HTMLInputElement>(null);

  // Efeito para gerenciar o contador
  useEffect(() => {

    let interval: NodeJS.Timeout | null = null;

    if (isActive) {

      interval = setInterval(() => {

        if (seconds === 0) {

          if (minutes === 0) {

            if (interval) clearInterval(interval);

            if (!isRest) {

              setIsRest(!isRest)

              if (cycles > 4) {
                setMinutes(15)
              } else {
                setMinutes(5)
              }

            } else {

              setIsRest(!isRest)

              setCycles(cycles + 1)

              setMinutes(25)

            }

          } else {

            setMinutes(minutes - 1);
            setSeconds(59);

          }

        } else {

          setSeconds(seconds - 1);

        }

      }, 1000);

    } else if (!isActive && (seconds !== 0 || minutes !== 0) && interval) {

      clearInterval(interval);

    }

    return () => {
      if (interval) clearInterval(interval);
    };

  }, [isActive, seconds, minutes]);

  // Função para iniciar/pausar o temporizador
  function toogleTimer(): void {

    if(!initPomodoro) {
      setInitPomodoro(true);
    }

    setIsActive(!isActive);

    if (!isActive) {
      setUserPause(false);
    } else {
      setUserPause(true);
    }
    
  };

  // Função para resetar o temporizador
  function resetTimer(): void {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsRest(false);
    setCycles(0);
    setInitPomodoro(false);
    setUserPause(false);
  };

  // Formatação do tempo
  function formatTime(mins: number, secs: number): string {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  function handleUserTarget(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCurrentTargetUser(inputUserTarget.trim() ? inputUserTarget : "In inprovement 🚀");
    set_inputUserTarget("")
  }

  function initButtonToogle() {
    if (initPomodoro) {
      return "Continuar"
    } else {
      return "Iniciar"
    }
  }

  function skipCycle() {
    setCycles(cycles + 1);
  }

  return (

    <main className={`flex h-svh w-svw justify-center items-center ${!isRest ? "bg-app_background" : "bg-app_pause"}`}>

      <div className="bg-app_contrast rounded-2xl p-6 h-[90%] w-[90%] scrollbar_main overflow-y-auto overflow-x-hidden flex flex-col justify-between gap-24">

        <div className=''>

          <div className='items-center flex justify-between w-full'>

            <div className=''>

              <h1 className='text-white font-bold text-sm drop-shadow-app_button shadow-black'>POMODORO APP</h1>

            </div>

            <div className='flex gap-5'>

              <Button onClick={resetTimer}>Resetar</Button>

              {/* <DialogUserSettings /> */}

            </div>

          </div>

        </div>

        <div className="">

          <div className='flex justify-center items-center gap-12 flex-wrap'>

            <div>

              <div className='flex flex-col gap-2.5'>

                <h1 className={`text-center ${!isUserPause ? "text-app_primary" : "text-app_alert"} text-9xl`}>{formatTime(minutes, seconds)}</h1>

                <div className='flex justify-center gap-5'>

                  <Button onClick={toogleTimer}>{isActive ? "Pausar" : initButtonToogle()}</Button>

                </div>

              </div>

            </div>

            <div className='bg-app_primary h-45 w-95 rounded-md p-5'>

              <div className='flex flex-col gap-2.5 justify-between h-full w-full'>

                <div className='bg-app_contrast rounded-md p-2.5 flex justify-between h-full'>

                  <p className='text-app_background place-self-center text-2xl'>
                    CICLOS: <span className='text-app_primary'>{cycles}</span>
                  </p>

                  <button className='text-center bg-app_contrast border-3 border-app_primary hover:brightness-125 rounded-md p-2.5 text-app_background cursor-pointer text-xs active:text-app_primary transition' onClick={skipCycle}>
                    PULAR CICLO
                  </button>

                </div>

                <form onSubmit={e => handleUserTarget(e)} className='flex'>

                  <input
                    type="text"
                    name='inputUserTarget'
                    className='bg-app_background rounded-l-md w-full outline-0 p-2.5 border-2 border-app_contrast'
                    value={inputUserTarget}
                    onChange={e => set_inputUserTarget(e.target.value)}
                    ref={ref_inputTargetUser}
                  />

                  <button
                    name='inputUserTarget'
                    className='text-center bg-app_contrast hover:brightness-125 rounded-r-md p-2.5 text-app_background cursor-pointer text-xs active:text-app_primary transition'
                    type='submit'
                  >
                    DEFINIR OBJETIVO
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

        <div className=''>

          <div className='flex items-center justify-start w-full bg-app_primary p-2.5 rounded-md'>

            <div className='flex flex-col gap-2 w-full'>

              <h1 className='text-app_contrast text-base font-bold'>
                OBJETIVO ATUAL:
              </h1>

              <div className='p-4 bg-app_contrast rounded-md'>

                <p className='text-app_primary break-all'>{currentTargetUser}</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

};