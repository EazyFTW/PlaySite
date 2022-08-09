import { Component, Fragment } from 'react';

import { fetchJson } from '../utils/utils';

import { Helmet } from 'react-helmet';

import Avatar from '../components/ui/Avatar';

const teams = [
    {
        name: "Repo Maintainers", users: ["lixin9311", "JoseMoreville", "roeegh", "Depal1"]
    },
    {
        name: "Website Maintainers", users: [
            {
                login: "EazyFTW",
                html_url: "https://github.com/EazyFTW",
                avatar_url: "https://avatars.githubusercontent.com/u/13033307?v=4"
            },
            "roeegh",
        ]
    },
    {
        name: "Docs Maintainers", users: ["roeegh", "IsaacMarovitz"]
    },
    {
        name: "Major Contributors", users: [
            {
                login: "akemin-dyao",
                html_url: "https://github.com/akemin-dayo",
                avatar_url: "https://avatars.githubusercontent.com/u/1980487?v=4"
            },
            {
                login: "GreenglassT",
                html_url: "https://github.com/GreenglassT",
                avatar_url: "https://avatars.githubusercontent.com/u/73795969?v=4?s=400"
            },
            "cryptoAlgorithm",
            "IsaacMarovitz",
            "ohaiibuzzle",
            "KhoraLee",
            "Candygoblen123"
        ]
    },
    {
        name: "Minor Contributors", users: [
            "zanderp25",
            "ZhichGaming",
            "wenqingl",
            "Dippyskoodlez",
            "hayatofujii",
            "TLC-10",
            "williamli0707",
            "r8bhavneet",
            "Animenosekai",
            "HongyuS",
            "Wind-Explorer",
            {
                login: "voltaicspy",
                html_url: "https://github.com/voltaicspy",
                avatar_url: "https://avatars.githubusercontent.com/u/95888304?v=4"
            }
        ]
    },
    {
        name: "Honorable Mentions", users: [
            "iVoider",
            {
                login: "lingfeishengtian",
                html_url: "https://github.com/lingfeishengtian",
                avatar_url: "https://avatars.githubusercontent.com/u/28375964?v=4"
            },
        ]
    },
];

export default class Team extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maintainers: undefined,
        }
    }

    componentDidMount() {
        this.mounted = true;

        const checkTime = localStorage.getItem("timeContributors");

        if(checkTime == null || Date.now() - Number.parseFloat(checkTime) > 600000) { // Store for 10 minutes.
            fetchJson('https://api.github.com/repos/PlayCover/PlayCover/contributors?anon=1', s => {
                if (this.mounted)
                    this.setState({maintainers: s});

                localStorage.setItem("timeContributors", Date.now() + "");
                localStorage.setItem("contributors", JSON.stringify(s));
            }, () => {
                if (this.mounted)
                    this.setState({maintainers: undefined});
            }, 'GET');
        } else {
            if(this.mounted)
                this.setState({maintainers: JSON.parse(localStorage.getItem("contributors"))});
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <div className="max-w-7xl mx-auto">
                <Helmet>
                    <title>Team - PlayCover</title>
                </Helmet>
                {this.state.maintainers !== undefined && this.state.maintainers !== null && (
                    <>
                        {teams.map((team, i) => (
                            <Fragment key={i}>
                                <div className="mt-4 pb-8">
                                    <span className="text-2xl mx-4 xl:mx-0 font-itcavantgardestdmd bg-clip-text text-transparent bg-gradient-to-r from-pc-g to-pc-b">{team.name}</span>
                                </div>
                                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 pb-2">
                                    {team.users.map((c, i) => {
                                        const user = typeof c === 'string' ? this.state.maintainers.find(f => f.login === c) : c;

                                        return (
                                            <div key={i} className="font-lufga text-lg mx-auto text-center truncate">
                                                <a href={user.html_url} target="_blank" rel="noreferrer">
                                                    <Avatar url={user.avatar_url} name={user.login} size="mx-auto w-10 h-10 lg:w-16 lg:h-16 mb-3"/>
                                                    {user.login}
                                                </a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Fragment>
                        ))}
                    </>
                )}
            </div>
        );
    }
}