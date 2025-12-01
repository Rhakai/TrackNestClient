import { TrackNestApi } from "@/lib/services/TrackNestApi";
import PortfolioTable from "./components/PortfolioTable";

export default async function Page() {

	const [positions] = await Promise.all([
		TrackNestApi.getPositions()
	  ]);

	return (
		<main className="w-full h-full p-6 flex flex-col items-center">	
			<div className="w-full max-w-[1400px] h-full px-8 sm:px-12 lg:px-24">
				<PortfolioTable positions={ positions } />
			</div>
		</main>
	);
}
