import * as MediaIcons from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Footer() {
	const [socialMediaIcons, setSocialMediaIcons] = useState(null);
	useEffect(() => {
		async function getSocialMediaIcons() {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/social-media-links`
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				setSocialMediaIcons(data.data);
			} catch (error) {
				console.error("Failed to fetch data from Strapi:", error);
			}
		}

		getSocialMediaIcons();
	}, []);
	return (
		<div className="footer">
			<div className="left-column">
				<div className="row-container">
					<div className="left-column-row">Contact Us</div>

					<div className="left-column-row">
						<Image
							alt="phone icon"
							width={20}
							height={20}
							src={"/images/phone-footer-icon.svg"}
						/>
						<p className="contact-info-text"> 416 777 4309</p>
					</div>

					<div className="left-column-row">
						<Image
							alt="mail icon"
							width={20}
							height={20}
							src={"/images/mail-footer-icon.svg"}
						/>
						<p className="contact-info-text"> info@discoverLincoln.ca</p>
					</div>
				</div>
			</div>

			<div className="middle-column">
				<div className="discover-footer-logo">
					<Image
						alt="discover-lincoln logo"
						width={50}
						height={50}
						src={"/images/footer-grapes.svg"}
					/>
					<p className="discover-lincoln"> DISCOVER LINCOLN</p>
				</div>
				<div className="middle-column-row">
					<Link className="footer-options" href={"/"}>
						<div className="footer-options">Home</div>
					</Link>
					<Link href={"feed"} className="footer-options">
						<div className="footer-options">Feed</div>
					</Link>
					<Link className="footer-options" href={"/about"}>
						<div className="footer-options">About</div>
					</Link>
					<Link className="footer-options" href={"/trivia"}>
						<div className="footer-options">Trivia</div>
					</Link>
					<Link className="footer-options" href={"/create"}>
						<div className="footer-options">Create</div>
					</Link>
				</div>
			</div>

			<div className="right-column">
				<Link
					className="civiconnect-footer-logo"
					href={"https://www.civiconnect.ca/"}
					target="_blank"
				>
					<Image
						alt="civiconnect logo"
						width={200}
						height={200}
						className="hover:scale-105 transition-all duration-300"
						src={"/images/civi-logo 1.svg"}
					/>
				</Link>

				<div className="media-icons-wrapper">
					{socialMediaIcons &&
						socialMediaIcons.map((item) => (
							<Link
								key={item.id}
								className="media-icon"
								href={item.URL}
								aria-label={`link to ${item.URL}`}
							>
								<FontAwesomeIcon
									icon={MediaIcons[item.Icon]}
									className="text-3xl transition-all duration-300 hover:scale-110"
								/>
							</Link>
						))}
				</div>
			</div>

			<style jsx>{`
                
				.footer {
					display: flex;
                    justify-content: space-between;
                    background-color: var(--purple);
                    color: var(--off-white);
                    min-height: 138px;
                    width: 100%;
                    overflow: hidden;
                    box-sizing: border-box;
                    flex-wrap: wrap;
                    padding: 16px;
				}

                .left-column {
                    font-weight: bold;
                    display: flex;
                    width: 20%;
                    flex-direction: column;
                    justify-content: center;
                    text-align: left;
                    align-items: flex-start;
                    padding: 5px;
                   
                }

                .row-container{
                    display: flex; 
                    flex-direction: column;
                    justify-content: center; 
                    align-items: flex-start; 
                    gap: 0.5rem;
                     
                }

                .left-column-row {
                    display: flex; 
                    justify-content: flex-start; 
                    align-items: center; 
                    padding-top: 8px; 
                    text-align: left;
                    
                }
                
                .contact-info-text{
                    font-size: 15px;
                    padding-left: 10px;
                }
        
                .middle-column {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transform: scale(1.1);
                    gap: 10px;
                }

                .middle-column-row {
                    display: flex;
                    flex-direction: row;
                    gap: 20px;
                    justify-content: center;
                    flex-wrap: wrap;
                    width: 100%;
                    
                }

                .footer-options{
                    flex-direction: row;
                    flex: 1 1 auto; 
                    font-weight: bold;
                }

                .discover-footer-logo {
                    display: flex; 
                    flex-direction: row;
                    align-items: center; 
                    justify-content: center;
                    padding-top: 10px; 
                    text-align: center;
                    width: 100%;
                }

                .discover-lincoln {
                    font-size: 15px;
                    font-weight: bold;
                }

                .right-column {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 20%;
                    flex-shrink: 0;
                    box-sizing: border-box;
                    gap: 1rem;
                    text-align: center;
                }

                .civiconnect-footer-logo {
                    display: flex; 
                    flex-direction: row;
                    align-items: center; 
                    justify-content: center;
                    padding-top: 10px; 
                    text-align: center;
                    width: 100%;
                }

                .media-icons-wrapper{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: no-wrap; 
                    gap: 16px; 
                    align-items: center;
                    justify-content: center;
                   
                }

                .footer-options:hover {
                    text-decoration: underline; 
                    cursor: pointer; 
                }
                

                @media screen and (max-width: 769px) {

                    .footer {
                        display: flex;
                        flex-direction: column; 
                        align-items: center;   
                        gap: 10px;
                    }

                    .discover-footer-logo {
                        display: flex;
                        order: 0; 
                        width: 100%; 
                        text-align: center;
                    }

                     .discover-lincoln {
                        display: none; 
                    }

                    .middle-column {
                        order: 1; 
                        width: 100%; 
                        align-items: center;
                    }

                    .middle-column-row {
                        display: flex;
                        padding: 0px 40px;
                        max-width: 400px;
                        grid-template-columns: repeat (2, 1fr);
                        grid-auto-rows: auto;
                        gap: 10px;
                        justify-content: center;
                        width: 100%;
                    }
                    

                    .left-column {
                        order: 2;
                        display: flex;
                        flex-direction: column; 
                        width: 100%; 
                        align-items: center;
                        display: flex;
                        justify-content: flex-start;
                    }

                    .left-column-row{
                        display: flex;
                        justify-content: flex-start;
                    }

                    .right-column {
                        order: 3; 
                        width: 100%; 
                        align-items: center;
                        gap: 1rem;
                    }               

                    .left-column-row {
                        width: 100%; 
                        text-align: center;
                        justify-content: center;
                        align-items: center;
                       
                    }

                    .media-icons-wrapper {
                        width: 100%; 
                        justify-content: center;
                    }

                    .civiconnect-footer-logo {
                        order: 2;
                        gap: 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%; 
                        margin: 0; 
                        padding: 0; 
                        text-align: center; 

                    }
                }
            }
			`}</style>
		</div>
	);
}
