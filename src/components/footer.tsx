import {Link, Text, Spacer} from "@nextui-org/react"

export default function Footer() {
    return (
        <div className="footer">
            <Text>Made by Aldrin Leal, <Link href="https://aldrinleal.link">https://aldrinleal.link</Link> with
                &nbsp;some&nbsp;
                <Link href="https://nextjs.org">Next.js</Link>&nbsp;/&nbsp;
                <Link href="https://nextui.org/">NextUI</Link>&nbsp;/&nbsp;
                <Link href="https://vercel.com">Vercel</Link>&nbsp;/&nbsp;
                <Link href="https://reactjs.org">react</Link>
            </Text>
            <Spacer y={1}/>
            <Text>Source Code at <Link
                href="https://github.com/aldrinleal/isitaws">https://github.com/aldrinleal/isitaws</Link></Text>
            <Spacer y={1}/>
            <Text>See also the <Link href="https://docs.aws.amazon.com/vpc/latest/userguide/aws-ip-ranges.html">AWS Docs
                for this</Link></Text>
        </div>
    )
}
