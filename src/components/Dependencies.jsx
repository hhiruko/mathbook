import { FolderGit2, FilePlus2, BookText, Boxes, Download, Trash2 } from "lucide-preact";

export function Dependencies() {
    return (
        <>
            <h2>Dependencies <Boxes /></h2>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Version</th>
                    <th>Src</th>
                    <th>Descripton</th>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="https://cortexjs.io/mathfield/">Mathfield</a></td>
                        <td>0.105.3</td>
                        <td>jsdelivr</td>
                        <td>Visual math input field</td>
                    </tr>
                    <tr>
                        <td><a href="https://watercss.kognise.dev/">Water.css</a></td>
                        <td>2.1.1</td>
                        <td>jsdelivr</td>
                        <td>Tiny, classless CSS framework</td>
                    </tr>
                    <tr>
                        <td><a href="https://lucide.dev/guide/packages/lucide-preact">Lucide Preact</a></td>
                        <td>^0.523.0</td>
                        <td>npm</td>
                        <td>Icon library</td>
                    </tr>
                    <tr>
                        <td><a href="https://vite.dev/">Vite</a></td>
                        <td>^6.3.5</td>
                        <td>npm</td>
                        <td>Build tool and dev server</td>
                    </tr>
                    <tr>
                        <td><a href="https://preactjs.com/">Preact</a></td>
                        <td>^10.26.9</td>
                        <td>npm</td>
                        <td>Lightweight alternative to React</td>
                    </tr>
                    <tr>
                        <td><a href="https://github.com/isaacs/node-glob#readme">Glob</a></td>
                        <td>^11.0.3</td>
                        <td>npm</td>
                        <td>File matching utility</td>
                    </tr>
                    <tr>
                        <td><a href="https://github.com/itgalaxy/favicons">Favicons</a></td>
                        <td>^7.2.0</td>
                        <td>npm</td>
                        <td>Favicons and webmanifest tool</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}