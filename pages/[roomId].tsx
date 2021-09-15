import Playground from "../components/Playground";
import Sidebar from "../components/Sidebar";

export default function Room() {
	return (
		<>
			<div className="flex flex-row gap-4 h-full justify-between">
				<Playground />
				<Sidebar />
			</div>
		</>
	);
}
