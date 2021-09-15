import {
	AudioCodecSettings,
	ConnectOptions,
	VideoCodecSettings,
} from "twilio-video";

const microphone_config: AudioCodecSettings = {
	codec: "opus",
};
const video_config: VideoCodecSettings = {
	codec: "H264",
};

const connection_opts: Partial<ConnectOptions> = {
	automaticSubscription: true,
	bandwidthProfile: {
		video: {
			mode: "grid",
			clientTrackSwitchOffControl: "auto",
			contentPreferencesMode: "auto",
			dominantSpeakerPriority: "high",
			maxSubscriptionBitrate: 320,
		},
	},
	preferredAudioCodecs: [microphone_config],
	preferredVideoCodecs: [video_config],
};

const twillio_config = {
	APP_ID: process.env.APP_ID,
	microphone_config,
	video_config,
	connection_opts,
};

export default twillio_config;
