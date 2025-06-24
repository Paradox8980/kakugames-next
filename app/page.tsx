'use client';

import AdUnit from '@/components/AdUnit';
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
	googletag: any;
  }
}

export default function Home() {

	const [showModal, setShowModal] = useState(true);
	const [isAdLoaded, setIsAdLoaded] = useState(false);

	const playGame = (url: string) => {
		// console.log(url);
		window.location.href = "https://kakugames.com/game/" + url;
	}

	const closePopup = () => {
		setShowModal(false);
	}

	useEffect(() => {
		// initializeRewardedAd();
		showRewardAd();
	}, []);

	const initializeRewardedAd = () => {
		window.googletag = window.googletag || { cmd: [] };
		const googletag = (window as any).googletag;
		
		window.googletag.cmd.push(() => {
			// Define the rewarded ad slot
			const rewardedSlot = window.googletag.defineOutOfPageSlot(
				'/23178317433/kaku_reward',
				window.googletag.enums.OutOfPageFormat.REWARDED
			);
			
			if (rewardedSlot) {
				rewardedSlot.addService(window.googletag.pubads());
				// Event listeners
				window.googletag.pubads().addEventListener('slotResponseReceived', (event: any) => {
					if (event.slot === rewardedSlot) {
						setIsAdLoaded(true);
					}
				});
				
				window.googletag.pubads().addEventListener('rewardedSlotReady', (event: any) => {
					// Show the ad when ready
					window.googletag.pubads().show(rewardedSlot).then(() => {
						console.log('Rewarded ad shown');
					});
				});
				
				window.googletag.pubads().addEventListener('rewardedSlotGranted', () => {
					console.log('User earned reward');
				});
				
				window.googletag.enableServices();
			}
		});
	};
	
	const showRewardedAd = () => {
		if (!isAdLoaded) {
			console.log('Ad not loaded yet');
			return;
		}
		
		window.googletag.cmd.push(() => {
		  	window.googletag.pubads().refresh();
		});
	};

	const showRewardAd = () => {
		if (!window.googletag || !window.googletag.cmd) {
			console.error("Google Ad Manager is not properly initialized.");
			return; 
		}

		window.googletag.cmd.push(function () {
			try {
				const rewardedSlot = window.googletag
					.defineOutOfPageSlot('/23178317433/kaku_reward', window.googletag.enums.OutOfPageFormat.REWARDED)
					.addService(window.googletag.pubads());

				window.googletag.enableServices();
				window.googletag.display(rewardedSlot);
				console.log("Attempting to display rewarded ad...");

				window.googletag.pubads().addEventListener("rewardedSlotReady", function (evt: any) {
					console.log("Rewarded ad ready.");
					evt.makeRewardedVisible();
				});

				window.googletag.pubads().addEventListener("rewardedSlotClosed", function () {
					console.log("Ad closed.");
					window.googletag.destroySlots([rewardedSlot]);
				});
			} catch (error) {
			  	console.error("Error during ad setup:", error);
			}
		});
	}
	return (
		<div className="w-full md:w-[400px] bg-white h-full border-x-1 border-gray-200">
			<button 
				onClick={showRewardedAd} 
				disabled={!isAdLoaded}
				className="rewarded-ad-button hidden"
			>
				{isAdLoaded ? 'Watch Ad for Reward' : 'Loading Ad...'}
			</button>
			{ showModal &&
				<div className="fixed modal z-50 inset-0 flex items-center justify-center w-[100%]">
					<div className="fixed inset-0 bg-gray-800 opacity-[0.6]"></div>
					<div className="relative flex bg-white/20 border-2 border-white/60 text-white flex-col justify-center items-center mx-1 md:mx-4 p-8 rounded-[1rem] lg:w-[40%] w-full md:w-[350px] z-51">
						<button className="absolute -top-12 right-0 mx-2 p-2 bg-slate-400/50 rounded-full cursor-pointer text-white-500 hover:text-gray-700 focus:outline-none" onClick={() => closePopup()}>
							<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						</button>
						<AdUnit
							adUnitPath="/23178317433/kaku_reward"
							sizes={[[728, 90], [970, 90]]}
							id="div-gpt-ad-123456789-1"
						/>
					</div>
				</div>
			}
			<AdUnit
				adUnitPath="/23178317433/kaku_reward"
				sizes={[[728, 90], [970, 90]]}
				id="div-gpt-ad-123456789-0"
			/>
			<div className="m-5 p-5 border border-gray-200 rounded-xl shadow-lg/10 text-center">
				<div className="text-sm text-center text-gray-400">Redeem rewards to play free games</div>
				<button className="bg-blue-500 rounded-xl w-full py-2 text-white font-semibold text-md mt-2 shadow-lg/10 cursor-pointer">Lets Play 🔥</button>
			</div>
			<div className="m-5 p-5 border border-gray-200 rounded-xl shadow-lg/10 text-center">
				<div className="text-sm text-center text-gray-400">Choose which of these types of games you prefer!</div>
				<div className="flex gap-2">
					<button className="flex justify-center items-center	gap-2 bg-blue-500 rounded-xl w-full py-2 text-white font-semibold text-md mt-2 shadow-lg/10 cursor-pointer"><img className="w-5 h-5" src="/action.webp" />Action</button>
					<button className="flex justify-center items-center	gap-2 bg-blue-500 rounded-xl w-full py-2 text-white font-semibold text-md mt-2 shadow-lg/10 cursor-pointer"><img className="w-5 h-5" src="/casual.webp" />Casual</button>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 mx-5">
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('expert-goalkeeper')}>
					<img src="/gol.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">Expert Goalkeeper</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('ultimate-baseball')}>
					<img src="/baseball.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">Baseball</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('flip-the-knife')}>
					<img src="/flip.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">Flip The Knife</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('hangman')}>
					<img src="/hangman.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">Hangman</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('super-jump')}>
					<img src="/jump.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">Super Jump</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('duck-hunter')}>
					<img src="/duck.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">duck-hunter</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('8-ball-pool-with-friends')}>
					<img src="/pool.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">8 Ball Pool</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('brick-breaker')}>
					<img src="/brick.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">Brick Breaker</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('halloween-chess')}>
					<img src="/ches.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">Halloween Chess</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-200 rounded-2xl shadow-lg/10 text-center" onClick={() => playGame('flick-basketball')}>
					<img src="/basketball.webp" className="rounded-2xl" />
					<div className="text-black uppercase font-semibold tracking-tight text-xs">Basket Ball</div>
					<button className="bg-blue-500 rounded-2xl w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Game</button>
				</div>
			</div>
			<div className="text-center">
				<button className="bg-blue-500 rounded-xl w-5/6 py-2 text-white font-semibold text-md mt-2 shadow-lg/10 cursor-pointer">More Games</button>
			</div>
			<div className='my-4'>
				<p className="text-center text-lg font-semibold">About Pokigame</p>
				<div className="mt-2 mx-5">
					<p>Play free games online at pokiigame.com and enjoy endless fun! Choose from a variety of genres, including puzzle games, card games, adventure games, sports games, racing games, and car games.</p>
					<br />
					<p>Dive into the smooth gameplay of free HTML5 games online and create unforgettable memories. Start playing now and discover the excitement!</p>
					<br />
					<p>Each free game features unique, well-designed levels filled with exciting challenges. Playing is easy and fun, but mastering it requires skill and strategy!</p>
					<br />
					<p>Stay tuned for more thrilling levels and updates to our free online games more fun is on the way!</p>
				</div>
			</div>
			<footer className="flex mx-5 border-t py-2 justify-between">
				<a href="#">Privacy Policy</a>
				<span>Kakugames.com</span>
			</footer>
		</div>
	);
}
