import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function FrontPageText() {
    return (
        <Card sx={{ mt: 15, mb: 5 }} variant="outlined">
            <CardContent>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    textAlign="center"
                >
                    You have been asked by Deutsche Bank to build a prototype
                    system to help support the mentoring process. Ideally, this
                    system allows people to sign up as either mentees or mentors
                    and could be matched to each other based on their
                    preferences. This matching could consider the criteria of
                    the mentee, the expertise of the mentor and other factors
                    such as the workload of each employee.
                    <br />
                    Not only should this system facilitate the initial pairing,
                    but it should support all aspects of the mentoring process.
                    Meetings should be bookable, along with records that show
                    what was discussed. Plans of action could be created, and
                    tracked, through the system allowing both parties to see the
                    growth of the mentee.
                    <br />
                    An important aspect of this system will also be feedback -
                    both from the mentor to the mentee on their progress,
                    performance and development and from the mentee about how
                    their mentor performs in their role. This can include if the
                    mentor is an appropriate match of them, if the relationship
                    is what they expected and how they find the mentor overall.
                    This sort of feedback could be incorporated into the
                    software to improve its ability to match individuals. There
                    could also be a space for suggestions to help the software
                    develop and improve over time.
                    <br />
                    There are many other dynamic features that could added. For
                    example, if many people are looking to be mentored in a
                    particular skill, the system could contact appropriate
                    mentors and suggest they organise a workshop or group
                    learning experience.
                    <br />
                    The diversity of Deutsche Bank’s services mean they employ a
                    wide range of skilled professionals and so the system must
                    be intuitive and easy to use, even for a non-technical
                    person. Thus the user experience and UI development will
                    also be important. Furthermore, integration should be
                    considered. This system should be easily deployable and
                    compatible with different systems. Thought should be given
                    on how the system may integrate with other products and how
                    easy it is to access certain information.
                    <br />
                    It should also go without saying that the data stored by
                    this system is considered Confidential, and so thought
                    should be given on how best to protect the privacy of the
                    users, as well as following standard GDPR protocols.
                </Typography>
            </CardContent>
        </Card>
    );
}
export default FrontPageText;
