import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = path.join(
  "C:\\Users\\compusoft\\.cursor\\projects\\d-AhmedFathy-GTS\\assets",
);

const files: Record<string, string> = {
  "motor.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-36822a92-40a9-4e11-8217-647df0eb57ce.png",
  "pivot-parts.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-6e49ad5f-96c1-49e0-a551-3b8f3ffe4509.png",
  "structure-angles.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-086cd94b-3a74-4297-85ba-b6623ad6f35e.png",
  "structure-base.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-5baddfde-4314-4c74-9b08-372084a7eac2.png",
  "slip-ring.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-3273677c-0ddf-4b50-8564-2a92c596293a.png",
  "bearings.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-4da48732-2e3d-40de-ad87-430e7864cf6b.png",
  "cables.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-32f56927-c0bf-4d80-a76c-9b93e4553a26.png",
  "gearboxes.jpg":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-6f712d0e-12d1-41da-b8b0-aa0ef7c76594.jpg",
  "gearbox.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-815408d4-e2e2-40f0-a67a-71f1872c81d7.png",
  "sprinkler.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-507b70ad-5d7c-4563-a97c-b34ed6db80ac.png",
  "sprinkler-field.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-c9912ce8-16d7-4cd7-9adb-a3fb9cd20834.png",
  "valves.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-c4e0aff9-13cf-4ef9-a9ec-53ac36c17fe3.png",
  "harvester.jpg":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-f738a0fe-47c3-47f1-8eec-d9a00251412d.jpg",
  "tractor.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-6aa90ca4-03b4-408d-96fa-1daa466186ec.png",
  "tractors.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-fda6b3a1-85cc-4332-9585-dd75f1f8a368.png",
  "parts-drive.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-555016d0-cda7-40c0-8356-ab67a758cc5b.png",
  "parts-layout.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-65e4bed6-0536-4a16-9513-a8d37a127fc8.png",
  "parts-engine.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-78c75772-d75c-4a5a-9826-e8b5d1079e4d.png",
  "parts-kit.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-9121f8e6-22c7-4237-830c-3e256ef5701c.png",
  "part-gearbox.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-ef578ac7-c49b-4a90-b39b-5ceec73e5022.png",
  "part-pto.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-5a552724-5fad-4c9c-b4b1-f7678c818869.png",
  "part-engine.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-8e4cc8a9-f7f5-4678-8b2f-33ecf450f3e1.png",
  "part-bearing.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-7c76761b-e903-4c5b-9385-9a84fc2d88f8.png",
  "part-fitting.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-06de8dbc-f199-4994-8aab-39cb6c21f00a.png",
  "part-hydraulics.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-e796b1ea-b8ef-4336-9f90-de922389ae61.png",
  "part-exhaust.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-339d2a4a-eec6-4dbb-9638-c997c186db96.png",
  "part-clutch.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-bcdf0223-dcc6-44a0-a989-b9c841b87b1b.png",
  "part-tire.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-cf363151-34fc-4149-8380-84bf518e1118.png",
  "gen-cat.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-835369fa-c06e-4a21-a26b-2e72805e5893.png",
  "gen-open.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-ab05f1b8-1fb8-4ffb-9604-48c426c84805.png",
  "gen-silent.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-a720a476-1162-442b-a4cd-da2cc595dab4.png",
  "gen-hall.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-3b7cac48-93a1-442d-869e-d5e4725d6d02.png",
  "gen-plant.jpg":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-4b381d68-49ed-4187-918d-fab060d39928.jpg",
  "gen-canopy.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-e3eccf51-2aff-43f0-8bbf-f06c0e43d6d6.png",
  "pivot-field.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-fdf6a8f0-2204-4ce5-b9ce-bcf21d50f7f5.png",
  "pivot-chart.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-b7f577c4-d956-424a-a8d1-814a47cc7f6e.png",
  "pivot-tires.jpg":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-4a259342-552d-42d0-9cb3-a8d504496334.jpg",
  "pivot-tire.jpg":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-a32ac0d9-da64-40a2-9437-3d34a1f68336.jpg",
  "piv-panel.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-f52be342-c82f-4690-9358-91afc000b47b.png",
  "piv-tower.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-93b69c09-a47d-4fd6-bd8d-9bfe8ca5c4b2.png",
  "piv-ring.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-bf084948-ed6a-4d89-bc3e-788cac574d80.png",
  "piv-cable.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-075665fa-c1a8-408b-b7f7-6a8abf63afae.png",
  "piv-motor.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-8d62dbc9-556d-4014-b939-fdbb96a0fff0.png",
  "piv-gear.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-8e9626e4-2600-4c3f-9409-94297c43b92a.png",
  "piv-wheel.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-ac19f255-ea0d-4108-994c-58481cc076e0.png",
  "piv-coupler.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-bd28a6d4-4734-4425-8d92-372fa30a49d2.png",
  "piv-d3000.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-b1f35a0d-2329-4f88-97f1-f4279765a565.png",
  "piv-r3000.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-e82737ba-b77c-4462-87c4-247203da0438.png",
  "piv-pr15.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-24b70ccc-9621-4f73-8593-b8ec3383a451.png",
  "piv-prhi.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-590667b6-628f-4ee3-b8d1-f1af3d8ee6ee.png",
  "piv-gun.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-57e7a911-d5fe-43f9-93f6-5c303d26b187.png",
  "piv-timer.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-f2afe872-3e75-4c65-b4ad-79acbb4649b4.png",
  "piv-switch.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-dd2fae01-379a-481f-a4a6-a5920a904613.png",
  "piv-light.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-34238c03-97d0-4ecd-aa3f-02de7fa78e92.png",
  "sup-tools.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-7412e598-8bd9-470c-ae84-6757400c679a.png",
  "sup-power.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-3489171e-401d-488e-a399-55387efaaad5.png",
  "sup-electric.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-f432f61c-e53b-4351-abc7-31250e3ef8a6.png",
  "sup-cables.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-ce944786-781b-4753-a96f-4678cce99fff.png",
  "sup-pumps.jpg":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-b35ef401-6be0-4a36-a1da-9a7b9ff4c513.jpg",
  "sup-pumproom.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-02644a5e-c034-4b79-8dcf-ff72ac1f6849.png",
  "sup-pumpset.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-3df64308-39cb-4722-b0fe-982f698fb170.png",
  "sup-wires.png":
    "c__Users_compusoft_AppData_Roaming_Cursor_User_workspaceStorage_a8714ec7d45bb6982a01cd0bfe402873_images_image-aaf37595-3208-45bc-9f2e-314d0db4da24.png",
};

const cacheDir = path.join(os.tmpdir(), "gts-photos");

function sized(request: Request) {
  const raw = Number(new URL(request.url).searchParams.get("w"));
  if (!Number.isFinite(raw)) return 1600;
  return Math.min(1920, Math.max(240, Math.round(raw)));
}

export async function GET(
  request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;
  const file = files[name];
  if (!file) return new Response("Not found", { status: 404 });

  const sourcePath = path.join(root, file);
  const width = sized(request);
  const sourceStat = await stat(sourcePath);
  const cachePath = path.join(cacheDir, `${name}-${width}-${Math.round(sourceStat.mtimeMs)}.webp`);

  let bytes: Buffer;
  try {
    bytes = await readFile(cachePath);
  } catch {
    const input = await readFile(sourcePath);
    bytes = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74, effort: 4 })
      .toBuffer();
    await mkdir(cacheDir, { recursive: true });
    await writeFile(cachePath, bytes).catch(() => undefined);
  }

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(bytes.length),
      "Cache-Control": "public, max-age=2592000",
    },
  });
}
