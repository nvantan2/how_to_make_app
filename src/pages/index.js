import Head from "next/head";
import MenuWrapper from "../components/MenuWrapper";

export default function Home() {
	return (
		<div className="">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
					rel="stylesheet"
				></link>
			</Head>

			<MenuWrapper></MenuWrapper>
		</div>
	);
}
