import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Navbar({ transparent = false }) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={`flex sticky top-0 md:flex-row items-center hover:bg-white px-4 md:items-center justify-between h-[76px] z-[9999] transition-colors duration-300 ${
				!transparent ? "bg-white" : "bg-[#FFFFFF00]"
			}`}
		>
			{/* grape picture */}
			<Link href={"/"}>
				<div className="relative flex items-center">
					<div className="w-10 h-10 bg-[var(--green)] rounded-full flex items-center justify-center overflow-hidden">
						<div className="relative w-[33px] h-[30px]">
							<Image
								src="/images/grapes.svg"
								alt="Grape"
								className="object-cover w-full h-full"
								fill
								style={{
									filter:
										"brightness(0) saturate(100%) invert(86%) sepia(99%) saturate(0%) hue-rotate(319deg) brightness(108%) contrast(101%)",
								}}
							/>
						</div>
					</div>
					<span className="ml-2 text-[var(--green)] font-bold text-lg uppercase">
						DISCOVER LINCOLN
					</span>
				</div>
			</Link>

			{/* mobile menu */}
			<div className="md:hidden flex flex-col items-start">
				<button
					className="text-[var(--purple)] mt-1 text-2xl font-bold uppercase"
					onClick={toggleMenu}
				>
					☰
				</button>
				{isOpen && (
					<div className="absolute left-0 top-16 w-full bg-white shadow-lg rounded-md p-4">
						<Link
							href="/"
							className="block text-[var(--green)] font-bold text-lg uppercase hover:underline hover:decoration-2 hover:underline-offset-4 mb-2"
						>
							Home
						</Link>
						<Link
							href="/feed"
							className="block text-[var(--green)] font-bold text-lg uppercase hover:underline hover:decoration-2 hover:underline-offset-4 mb-2"
						>
							Feed
						</Link>
						<Link
							href="/about"
							className="block text-[var(--green)] font-bold text-lg uppercase hover:underline hover:decoration-2 hover:underline-offset-4 mb-2"
						>
							About
						</Link>
						<Link
							href="/trivia"
							className="block text-[var(--green)] font-bold text-lg uppercase hover:underline hover:decoration-2 hover:underline-offset-4 mb-2"
						>
							Trivia
						</Link>
						<Link
							href="/create"
							className="block text-[var(--green)] font-bold text-lg uppercase hover:underline hover:decoration-2 hover:scale-105 hover:underline-offset-4 mb-2"
						>
							Create
						</Link>
					</div>
				)}
			</div>

			{/* navigation for desktop */}
			<div className="hidden md:flex items-center space-x-6">
				<Link
					href="/"
					className={
						"text-[var(--green)] font-bold text-lg uppercase hover:underline hover:decoration-2 hover:underline-offset-4 " +
						(router.pathname === "/" &&
							"underline underline-offset-4 decoration-2")
					}
					style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)" }}
				>
					Home
				</Link>
				<Link
					href="/feed"
					className={
						"text-[var(--green)] font-bold text-lg uppercase hover:underline hover:decoration-2 hover:underline-offset-4 " +
						(router.pathname === "/feed" &&
							"underline underline-offset-4 decoration-2")
					}
					style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)" }}
				>
					Feed
				</Link>
				<Link
					href="/about"
					className={
						"text-[var(--green)] font-bold text-lg uppercase hover:underline hover:decoration-2 hover:underline-offset-4 " +
						(router.pathname === "/about" &&
							"underline underline-offset-4 decoration-2")
					}
					style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)" }}
				>
					About
				</Link>
				<Link
					href="/trivia"
					className={
						"text-[var(--green)] font-bold text-lg uppercase hover:underline hover:decoration-2 hover:underline-offset-4 " +
						(router.pathname === "/trivia" &&
							"underline underline-offset-4 decoration-2")
					}
					style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)" }}
				>
					Trivia
				</Link>
				<Link
					href="/create"
					className="relative px-8 transition-all duration-300 py-2 bg-[var(--purple)] text-white font-bold text-lg uppercase rounded-md shadow-md hover:scale-105"
				>
					Create
				</Link>
			</div>
		</div>
	);
}
