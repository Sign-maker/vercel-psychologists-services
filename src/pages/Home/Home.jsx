import css from "./Home.module.css";
import { UniversalBtn } from "../../Components/UniversalBtn/UniversalBtn";
import { Icon } from "../../Components/Icon/Icon";
import { ICON_CLASSES } from "../../constants/iconConstants";
import img1x from "../../assets/images/girl-desktop-1x.jpg";
import img2x from "../../assets/images/girl-desktop-2x.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("psychologists");
  };

  return (
    <section className={css.heroSection}>
      <div className={`${css.wrapper} container`}>
        <div className={css.info}>
          <h1 className={css.title}>
            The road to the <span className={css.titleAccent}>depths</span> of
            the human soul
          </h1>
          <p className={css.text}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <UniversalBtn width={236} height={60} onClick={handleClick}>
            <span className={css.btnText}>Get started</span>
            <Icon
              iconName="icon-arrow-right-top"
              className={ICON_CLASSES.classLight}
            />
          </UniversalBtn>
        </div>
        <div className={css.imgWrapper}>
          <img
            className={css.heroImg}
            srcSet={`${img1x} 1x,${img2x} 2x`}
            alt="Psychologist"
            width="464"
          />

          <div className={css.countWrapper}>
            <span className={css.iconWrapper}>
              <Icon
                width="30"
                height="30"
                iconName="icon-check"
                className={ICON_CLASSES.classAccent}
              />
            </span>
            <div className={css.countInfoWrapper}>
              <p className={css.countInfoText}>Experienced psychologists</p>
              <p className={css.countInfoValue}>15,000</p>
            </div>
          </div>
          <div className={css.question}>
            <span className={css.questionSpan}>
              <Icon
                iconName="icon-question"
                className={ICON_CLASSES.classLight}
              />
            </span>
          </div>

          <div className={css.users}>
            <span className={css.usersSpan}>
              <Icon iconName="icon-users" className={ICON_CLASSES.classLight} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
