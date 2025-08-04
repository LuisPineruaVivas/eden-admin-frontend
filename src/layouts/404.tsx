import { Search, Home, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Alert, AlertDescription } from "@components/ui/Alert"
import { useTranslation } from "react-i18next"

export default function Error404() {
  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleGoBack = () => {
    window.location.href = "/"
  }

  const { t } = useTranslation("common")
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground mb-2">{t("translation.layoutsError.error404.title")}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{t("translation.layoutsError.error404.subtitle")}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-primary/20 bg-primary/5">
            <Search className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              {t("translation.layoutsError.error500.description")}
            </AlertDescription>
          </Alert>

          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>
              {t("translation.layoutsError.error404.errorcode")}: <span className="font-mono font-semibold">404</span>
            </p>
            <p>
              {t("translation.layoutsError.error404.time")}: <span className="font-mono">{new Date().toLocaleString()}</span>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 pt-4">
          <Button onClick={handleGoHome} className="w-full" size="lg">
            <Home className="w-4 h-4 mr-2" />
            {t("translation.layoutsError.error404.buttonhome")}
          </Button>

          <div className="flex space-x-2 w-full">
            <Button onClick={handleGoBack} variant="outline" className="flex-1 bg-background">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("translation.layoutsError.error404.buttonback")}
            </Button>

            <Button onClick={handleRefresh} variant="outline" className="flex-1 bg-background">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t("translation.layoutsError.error404.buttonreload")}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {t("translation.layoutsError.error404.description2")}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
