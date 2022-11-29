import React, { useState, useEffect } from "react";
import MenuIcon from "../img/menu.svg";
import serviceIcon from "../img/list-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { apiCategories } from "../interface";
import { setCategory, selectCategory } from "../slice/categorySlice";
import { ApiGetAllCategories } from "../util/apiRequest";

export default function Header() {
  const [service, setService] = useState<apiCategories[]>([]);
  const S_redux: apiCategories[] = useSelector(selectCategory);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (S_redux.length === 0) {
      ApiGetAllCategories().then((data: apiCategories[]) => {
        dispatch(setCategory(data));
        setService(data);
      });
    } else {
      setService(S_redux);
    }
  }, [S_redux]);

  return (
    <header className="header padding__header">
      <div className="header__content max-w">
        <Image
          className="header__burger"
          src={MenuIcon}
          alt="Icon pour ouvrir le menu"
          width={41}
          height={41}
          loading={"lazy"}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />

        <nav
          className={isOpen ? "header__nav header__nav-open" : "header__nav"}
        >
          <Link href="/">
            <Image
              className="header__logo"
              src={require("../img/logo-jcv.png")}
              alt="Logo entreprise"
            />
          </Link>

          <ul
            className={
              isOpen ? "header__list header__list-open" : "header__list"
            }
          >
            <li>
              <Link href="/" className="inter inter-medium">
                Accueil
              </Link>
            </li>
            <li
              onClick={() => {
                setServiceOpen(!serviceOpen);
              }}
            >
              <Link href="/" className="inter inter-medium header__serviceBtn">
                Service{" "}
                <Image
                  src={serviceIcon}
                  alt=""
                  width={18}
                  height={9}
                  loading="lazy"
                />
                <ul
                  className={
                    serviceOpen
                      ? "headerSmall__list headerSmall__list-open "
                      : "headerSmall__list"
                  }
                >
                  {service === undefined ? (
                    <DefaultList />
                  ) : (
                    service.map((item: apiCategories) => {
                      return (
                        <li key={item.id}>
                          <Link
                            key={item.id + "header"}
                            className="inter inter-medium"
                            href={{
                              pathname: "/products",
                              query: { id: item.id, nom: item.attributes.nom },
                            }}
                          >
                            {item.attributes.nom}
                          </Link>
                        </li>
                      );
                    })
                  )}
                </ul>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="inter inter-medium">
                contact
              </Link>
            </li>
          </ul>
        </nav>
        <Link href={"/devis"} className=" header__btn btn ">
          Etude personnaliser
        </Link>
      </div>
    </header>
  );
}

export const DefaultList = () => {
  return (
    <>
      <li>
        <Link href="/">Chauffe-eau</Link>
      </li>
      <li>
        <Link href="/">Photovoltaïque</Link>
      </li>
    </>
  );
};
