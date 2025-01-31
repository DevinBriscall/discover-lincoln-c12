import DetailSection from "@/components/DetailsSection";
import ImageGallery from "@/components/ImageGallery";
import { samplePOIs } from "@/utils/POIHelpers";
import Head from "next/head";
import { useRouter } from "next/router";
export default function Page({ data }) {
	const router = useRouter();
	console.log(data);
	const images = [
		{
			src: "/images/sebastian-unrau-sp-p7uuT0tw-unsplash.jpg",
		},
		{
			src: "/images/maja-petric-vGQ49l9I4EE-unsplash.jpg",
		},
		{
			src: "/images/frances-gunn-QcBAZ7VREHQ-unsplash.jpg",
		},
		{
			src: "/images/andrew-neel-1-29wyvvLJA-unsplash.jpg",
		},
		{
			src: "/images/CreatePageBacksplash.jpg",
		},
		{
			src: "/images/john-rodenn-castillo-a9smyzW_1V4-unsplash.jpg",
		},
	];

	return (
		<>
			<Head>
				<title>Discover Lincoln - {data?.[0]?.title || "Details"}</title>
			</Head>
			<div className="outer-container">
				<style>
					{`
                    .outer-container{
                        display: flex;
                        justify-content: center;
                        margin: 2rem;
                    }
                    .container{
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: calc(100vh - 76px - 4rem);
                        gap: 1rem;
                    }
                    .gallery-container{
                        background: blue;
                        align-self: center;
                        height: 100%;
                        width: 100%
                    } 
                    .details-section{
                        width: 100%;
                    }
                    
                    @media screen and (max-width: 769px){
                        .container{
                            grid-template-rows: 368px 1fr;
                            grid-template-columns: 1fr;
                        }

                        .outer-container{
                            margin: 0.5rem;
                        }
                    }
                `}
				</style>
				{data.length !== 0 ? (
					<div className="container">
						<ImageGallery images={data[0].images} />
						<div className="details-section">
							<DetailSection data={data[0]} />
						</div>
					</div>
				) : (
					<h1 style={{ height: "100vh" }}>
						Point of interest doesn&apos;t exist
					</h1>
				)}
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/point-of-interests?filters[slug][$eq]=${context.params.id}&populate=*`
	);
	const data = await res.json();

	return {
		props: {
			data: data.data,
		},
	};
}
