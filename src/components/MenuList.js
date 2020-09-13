import React, { useContext } from "react";
import Link from "next/link";
import "../styles/menuList.scss";
import { AppContext } from "./AppProvider";

const MenuList = ({ open }) => {
	const { questionType } = useContext(AppContext);
	return (
		<div
			className={open ? "menu__list__wrapper open " : "menu__list__wrapper "}
		>
			{questionType.length ? (
				<ul className="menu__list">
					{questionType.map((menu) => (
						<li key={menu.id}>
							<Link href={`/quiz-sets/${menu.uuid}`}>
								<a>
									{menu.name}
									<p>{menu.desc}</p>
								</a>
							</Link>
						</li>
					))}
				</ul>
			) : (
				""
			)}
		</div>
	);
};

export default MenuList;
