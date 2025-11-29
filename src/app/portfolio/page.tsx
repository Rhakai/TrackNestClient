import PositionsTable from "../dashboard/components/PositionsTable";

export default function Page() {
	return (
		// 1. "w-full h-full": Ensures the background takes up all available space
		// 2. "p-6": Adds padding to top and bottom (and initial side padding)
		<main className="w-full h-full p-6 flex flex-col items-center">
		
			{/* CONTAINER FOR THE TABLE
				- w-full: Takes full width available
				- max-w-7xl: Stops growing at a certain size (centering effect on large screens)
				- h-full: Takes full height
				- px-12: Adds EXTRA large padding on the sides (overrides parent if needed, or adds to it)
			*/}
			<div className="w-full max-w-[1400px] h-full px-8 sm:px-12 lg:px-24">
				<PositionsTable />
			</div>

		</main>
	);
}
