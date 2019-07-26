import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

export default class TrainingDashboard extends Component {
  render() {
    return (
      <div>
        <GridContainer direction="column" alignItems="center" justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
              facilis ratione consequatur perferendis consequuntur nesciunt
              tempore nisi? Tenetur accusantium saepe deserunt asperiores!
              Aspernatur recusandae, necessitatibus eaque id minus nulla
              consequuntur.
            </h1>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h3>Elérhető gyakorlatok</h3>
              </CardHeader>
              <CardBody>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
                aspernatur numquam quasi aliquam quaerat aut tenetur,
                consequuntur deserunt ullam vero expedita quas debitis natus
                culpa nesciunt ipsa, deleniti eos doloremque autem alias nihil
                nostrum ipsum perspiciatis. Placeat eum minima obcaecati
                excepturi incidunt repellendus ullam officiis. Obcaecati soluta
                perferendis eligendi totam dolorum aspernatur minima
                repudiandae, natus sunt amet temporibus iste molestias
                recusandae, voluptate ea blanditiis error fuga laborum iure
                dignissimos voluptas nihil doloribus autem tempora. Quo
                reiciendis quas, atque delectus laudantium obcaecati
                consequuntur veniam explicabo laboriosam mollitia molestiae
                facilis minus, ex non nostrum voluptatum dolorum assumenda
                vitae, illo maiores tempora voluptas quia corporis quidem. Velit
                iusto dolor laborum accusamus quidem ipsam distinctio nobis id
                numquam, enim sed tenetur quis molestiae perspiciatis fugit quod
                maxime corrupti labore vero exercitationem quas dolore hic sunt?
                Laborum consectetur quo facilis assumenda aut, neque culpa ea
                adipisci et totam aspernatur suscipit! Vitae id qui explicabo
                cumque soluta reiciendis dolor, earum sapiente veritatis amet
                quisquam suscipit mollitia voluptas deleniti, atque quidem
                perspiciatis, nisi repellat quo dolorem nihil nesciunt aperiam
                delectus eaque. Voluptatibus numquam rerum quo aut aspernatur
                explicabo ducimus facilis labore. Eius sed in distinctio vitae
                obcaecati reiciendis numquam labore dolor repellat quidem? Quos
                perferendis et quidem vitae inventore accusantium ex quisquam
                eos doloribus tenetur. Temporibus sequi labore ut quidem
                asperiores qui doloremque nemo nesciunt tempore assumenda?
                Dolorum iusto soluta possimus officiis temporibus quis earum
                eveniet rerum voluptatum blanditiis neque libero est, quaerat
                assumenda aperiam quia eaque tempore laudantium. Beatae sapiente
                deserunt fugit vero odio voluptatem voluptatibus?
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
