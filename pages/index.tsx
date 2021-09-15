import Welcome from "components/Welcome";
import Image from "next/image";
import bg from "public/vectors/friends-elem.png";

export default function Home() {
	return (
		<>
			<div className="flex flex-col lg:flex-row gap-4 lg:gap-0 min-h-full lg:h-full justify-between">
				<div className="flex-auto flex">
					<div className="w-full flex justify-center lg:justify-start lg:items-center items-end">
						<Image
							src={bg}
							alt="friends in bhetghat concept"
							draggable={false}
							layout="intrinsic"
						/>
					</div>
				</div>
				<Welcome />
			</div>
		</>
	);
}
