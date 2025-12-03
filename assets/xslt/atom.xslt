<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
<xsl:output method="html" encoding="utf-8" />
<xsl:template match="/atom:feed">
	<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html &gt;</xsl:text>
	<html>
	<head>
		<xsl:text disable-output-escaping="yes"><![CDATA[
		<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Atom Feed (Styled)</title>

    <link rel="stylesheet" type="text/css" href="https://cla.berkeley.edu//assets/css/styles_feeling_responsive.css">
    <link rel="stylesheet" type="text/css" href="https://cla.berkeley.edu//assets/css/tabs.css" />
    <link rel="stylesheet" type="text/css" href="https://cla.berkeley.edu//assets/css/cla.css" />

  

	<script src="https://cla.berkeley.edu//assets/js/modernizr.min.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js"></script>
	<script>
		WebFont.load({
			google: {
				families: [ 'Lato:400,700,400italic:latin', 'Volkhov::latin' ]
			}
		});
	</script>

	<noscript>
		<link href='http://fonts.googleapis.com/css?family=Lato:400,700,400italic%7CVolkhov' rel='stylesheet' type='text/css'>
	</noscript>


	<!-- Search Engine Optimization -->
	<meta name="description" content="The California Language Archive is a physical and digital archive for materials related to the Indigenous languages of the Americas, housed in the Survey of California and Other Indian Languages in the Department of Linguistics at the University of California, Berkeley. Our catalog also includes sound recordings held by the Phoebe A. Hearst Museum of Anthropology.">
	<meta name="google-site-verification" content="Vk0IOJ2jwG_qEoG7fuEXYqv0m2rLa8P778Fi_GrsgEQ">
	<meta name="msvalidate.01" content="0FB4C028ABCF07C908C54386ABD2D97F" >
	
	
	
	<link rel="canonical" href="https://cla.berkeley.edu//assets/xslt/atom.xslt">


	<!-- Facebook Open Graph -->
	<meta property="og:title" content="Atom Feed (Styled)">
	<meta property="og:description" content="The California Language Archive is a physical and digital archive for materials related to the Indigenous languages of the Americas, housed in the Survey of California and Other Indian Languages in the Department of Linguistics at the University of California, Berkeley. Our catalog also includes sound recordings held by the Phoebe A. Hearst Museum of Anthropology.">
	<meta property="og:url" content="https://cla.berkeley.edu//assets/xslt/atom.xslt">
	<meta property="og:locale" content="en_EN">
	<meta property="og:type" content="website">
	<meta property="og:site_name" content="California Language Archive">
	
	<meta property="article:author" content="https://www.facebook.com/scoil.media">


	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary">
	<meta name="twitter:site" content="scoil">
	<meta name="twitter:creator" content="scoil">
	<meta name="twitter:title" content="Atom Feed (Styled)">
	<meta name="twitter:description" content="The California Language Archive is a physical and digital archive for materials related to the Indigenous languages of the Americas, housed in the Survey of California and Other Indian Languages in the Department of Linguistics at the University of California, Berkeley. Our catalog also includes sound recordings held by the Phoebe A. Hearst Museum of Anthropology.">
	
	

	<link type="text/plain" rel="author" href="https://cla.berkeley.edu//humans.txt">

	

	

	<link rel="icon" sizes="32x32" href="https://cla.berkeley.edu/assets/img/favicon-32x32.png">

	<link rel="icon" sizes="192x192" href="https://cla.berkeley.edu/assets/img/touch-icon-192x192.png">

	<link rel="apple-touch-icon-precomposed" sizes="180x180" href="https://cla.berkeley.edu/assets/img/apple-touch-icon-180x180-precomposed.png">

	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://cla.berkeley.edu/assets/img/apple-touch-icon-152x152-precomposed.png">

	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://cla.berkeley.edu/assets/img/apple-touch-icon-144x144-precomposed.png">

	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://cla.berkeley.edu/assets/img/apple-touch-icon-120x120-precomposed.png">

	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://cla.berkeley.edu/assets/img/apple-touch-icon-114x114-precomposed.png">

	
	<link rel="apple-touch-icon-precomposed" sizes="76x76" href="https://cla.berkeley.edu/assets/img/apple-touch-icon-76x76-precomposed.png">

	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://cla.berkeley.edu/assets/img/apple-touch-icon-72x72-precomposed.png">

	<link rel="apple-touch-icon-precomposed" href="https://cla.berkeley.edu/assets/img/apple-touch-icon-precomposed.png">	

	<meta name="msapplication-TileImage" content="https://cla.berkeley.edu/assets/img/msapplication_tileimage.png">

	<meta name="msapplication-TileColor" content="#fabb00">


	

	


		]]></xsl:text>
	</head>
	<body id="top-of-page">
		<xsl:text disable-output-escaping="yes"><![CDATA[
		



<div id="navigation" class="sticky">
  <nav class="top-bar" role="navigation" data-topbar>
    <ul class="title-area">
      <li class="name">

      <h1><a href="https://cla.berkeley.edu/"> California Language Archive</a></h1>
    </li>
       <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
      <li class="toggle-topbar menu-icon"><a href="#"><span>Nav</span></a></li>
    </ul>
    <section class="top-bar-section">

      
      <ul class="right">
        

              



          
          
            
            
              <li class="divider"></li>
              <li><a  href="https://cla.berkeley.edu/">Home</a></li>

            
            
          
        

              



          
          
            
            
              <li class="divider"></li>
              <li><a  href="https://cla.berkeley.edu/cla-map.html">Map Search</a></li>

            
            
          
        

              



          
          
            
            

              <li class="divider"></li>
              <li class="has-dropdown">
                <a  href="https://cla.berkeley.edu/">Browse CLA</a>

                  <ul class="dropdown">
                    

                      

                      <li><a  href="https://cla.berkeley.edu/browse-collections.html">Collections</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/browse-languages.html">Languages</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/browse-people.html">People</a></li>
                    
                  </ul>

              </li>
            
          
        

              



          
          
            
            

              <li class="divider"></li>
              <li class="has-dropdown">
                <a  href="https://cla.berkeley.edu/">Resources</a>

                  <ul class="dropdown">
                    

                      

                      <li><a  href="https://cla.berkeley.edu/california-languages.html">California Languages</a></li>
                    

                      

                      <li><a  href="https://escholarship.org/uc/bling_survey" target="_blank">Survey Publications</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/dissertations.html">Affiliated Dissertations</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/language-maps.html">CA Language Maps</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/funding.html">Funding Sources</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/links.html">Links</a></li>
                    
                  </ul>

              </li>
            
          
        

              



          
          
            
            

              <li class="divider"></li>
              <li class="has-dropdown">
                <a  href="https://cla.berkeley.edu/">About</a>

                  <ul class="dropdown">
                    

                      

                      <li><a  href="https://cla.berkeley.edu/faq.html">FAQ</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/people.html">People</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/history.html">History</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/mission.html">Mission</a></li>
                    

                      

                      <li><a  href="https://www.aicls.org/?page_id=566" target="_blank">Breath of Life</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/using-cla.html">Terms &amp; Conditions</a></li>
                    

                      

                      <li><a  href="https://cla.berkeley.edu/give.html">Support the CLA</a></li>
                    
                  </ul>

              </li>
            
          
        

              



          
          
            
            
              <li class="divider"></li>
              <li><a  href="https://cla.berkeley.edu/for-depositors.html">Depositors</a></li>

            
            
          
        
        
      </ul>
      

      
    </section>
  </nav>
</div><!-- /#navigation -->

		

<div id="masthead-no-image-header">
	<div class="row">
		<div class="small-12 columns">
			<a id="logo" href="https://cla.berkeley.edu/" title="California Language Archive – By the Survey of California and Other Indian Languages">
				<img src="https://cla.berkeley.edu//assets/img/logo.png" alt="California Language Archive – By the Survey of California and Other Indian Languages">
			</a>
		</div><!-- /.small-12.columns -->
	</div><!-- /.row -->
</div><!-- /#masthead -->









		


<div class="alert-box warning text-center"><p>This <a href="https://en.wikipedia.org/wiki/RSS" target="_blank">Atom feed</a> is meant to be used by <a href="https://en.wikipedia.org/wiki/Template:Aggregators" target="_blank">RSS reader applications and websites</a>.</p>
</div>



		]]></xsl:text>
		<header class="t30 row">
	<p class="subheadline"><xsl:value-of select="atom:subtitle" disable-output-escaping="yes" /></p>
	<h1>
		<xsl:element name="a">
			<xsl:attribute name="href">
				<xsl:value-of select="atom:id" />
			</xsl:attribute>
			<xsl:value-of select="atom:title" />
		</xsl:element>
	</h1>
</header>
<ul class="accordion row" data-accordion="">
	<xsl:for-each select="atom:entry">
		<li class="accordion-navigation">
			<xsl:variable name="slug-id">
				<xsl:call-template name="slugify">
					<xsl:with-param name="text" select="atom:id" />
				</xsl:call-template>
			</xsl:variable>
			<xsl:element name="a">
				<xsl:attribute name="href"><xsl:value-of select="concat('#', $slug-id)"/></xsl:attribute>
				<xsl:value-of select="atom:title"/>
				<br/>
				<small><xsl:value-of select="atom:updated"/></small>
			</xsl:element>
			<xsl:element name="div">
				<xsl:attribute name="id"><xsl:value-of select="$slug-id"/></xsl:attribute>
				<xsl:attribute name="class">content</xsl:attribute>
				<h1>
					<xsl:element name="a">
						<xsl:attribute name="href"><xsl:value-of select="atom:id"/></xsl:attribute>
						<xsl:value-of select="atom:title"/>
					</xsl:element>
				</h1>
				<xsl:value-of select="atom:content" disable-output-escaping="yes" />
			</xsl:element>
		</li>
	</xsl:for-each>
</ul>

		<xsl:text disable-output-escaping="yes"><![CDATA[
		    <div id="up-to-top" class="row" role="navigation" arial-label="up to top">
      <div class="small-12 columns" style="text-align: right;">
        <a class="iconfont" href="#top-of-page">&#xf108;</a>
      </div><!-- /.small-12.columns -->
    </div><!-- /.row -->


    <footer id="footer-content" class="bg-grau">
      <div id="footer">
        <div class="row">
          <div class="small-12 medium-12 large-12 columns text-center">
          We acknowledge with respect the Ohlone people on whose traditional, ancestral, and unceded land we work and whose historical relationships with that land continue to this day.<br>
          &nbsp;<br>    
        </div>
      </div>
      </div>
      
      <!-- START OF END FOOTER -->

      <div id="subfooter">
         <!-- buttons -->
        <nav class="row">
          <section id="subfooter-left" class="small-4 medium-4 large-4 columns" style="text-align:right">
            <a href="/give.html"><button class="buttonsupport"><b> Support the CLA </b></button></a>
            <br>
            <a href="http://eepurl.com/igTzW1"><button class="buttonnewsletter"><b>Get our newsletter</b></button></a>
        </section>
        
            <!-- contact -->
          <section id="subfooter-mid" class="small-4 medium-4 large-4 columns contactinfo" style="text-align:center">
            <ul class="no-bullet shadow-black">
              
                  <li>Location: 1311 Dwinelle Hall</li>
              
                  <li>Email: scoil-ling@berkeley.edu</li>
              
                  <li>Phone: 510 642-8891</li>
              
                  <li><a href="https://dac.berkeley.edu/web-accessibility" target="_blank">Accessibility</a></li>
              
                  <li><a href="https://hamiltonrelay.com/california/how-it-works/tty-text-telephone.html" target="_blank">California Relay Service 711</a></li>
              
              </ul>
          </section>

           <!-- credits -->
          <section id="subfooter-right" class="small-4 medium-4 large-4 columns credits" style="text-align:left">
            <ul class="inline-list social-icons">
              
                <li><a href="http://www.facebook.com/pages/Survey-of-California-and-Other-Indian-Languages/370115324487" target="_blank" class="icon-facebook" title="Follow us on Facebook"></a></li>
              
                <li><a href="https://soundcloud.com/user-881486930" target="_blank" class="icon-soundcloud" title="Follow us on Soundcloud"></a></li>
              
                <li><a href="http://instagram.com/surveycla" target="_blank" class="icon-instagram" title="Follow us on Instagram"></a></li>
              
              </ul>
              <p><a href="http://phlow.github.io/feeling-responsive/">Feeling Responsive theme</a></p>
          </section>
        </nav>
      </div><!-- /#subfooter -->
    <script async src="https://siteimproveanalytics.com/js/siteanalyze_6294756.js"></script>
    </footer>

		<script src="https://cla.berkeley.edu//assets/js/jquery-3.3.1.js"></script>






<script src="https://cla.berkeley.edu/assets/js/javascript.min.js"></script>
<script src="https://cla.berkeley.edu/assets/js/foundation.interchange.min.js"></script>





















		]]></xsl:text>
	</body>
	</html>
</xsl:template>
<xsl:template name="slugify">
	<xsl:param name="text" select="''" />
	<xsl:variable name="dodgyChars" select="' ,.#_-!?*:;=+|&amp;/\\'" />
	<xsl:variable name="replacementChar" select="'-----------------'" />
	<xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
	<xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
	<xsl:variable name="lowercased"><xsl:value-of select="translate( $text, $uppercase, $lowercase )" /></xsl:variable>
	<xsl:variable name="escaped"><xsl:value-of select="translate( $lowercased, $dodgyChars, $replacementChar )" /></xsl:variable>
	<xsl:value-of select="$escaped" />
</xsl:template>
</xsl:stylesheet>
